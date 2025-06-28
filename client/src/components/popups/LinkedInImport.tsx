import React, { useState } from "react";
import { Linkedin, History, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import useAuth from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation";
import {
  setIsAIFeatureRequested,
  setResumeState,
} from "@/lib/store/slices/resumeStateChangeSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { toast } from "sonner";

interface LinkedInProfile {
  _id: string;
  fullName: string;
  headline: string;
  createdAt: string;
  isAIGenerated?: boolean;
}

const LinkedInImport = ({ children }: { children: React.ReactNode }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [instructions, setInstructions] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<LinkedInProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false); // New loading state

  const { user, isLoading: isAuthLoading } = useAuth();

  const dispatch = useAppDispatch();

  // Fetch profiles when the "Previous Imports" tab is selected
  const fetchProfiles = async () => {
    if (isAuthLoading) {
      return;
    }
    if (!user?._id) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/linkedin/get-profiles", {
        userId: user?._id,
      });
      if (response.data.success) {
        setProfiles(response.data.data);
        console.log("profiles", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sort profiles by date (latest first)
  const sortedProfiles = [...profiles].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Filter sorted profiles
  const filteredProfiles = sortedProfiles.filter(
    (profile) =>
      profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Loading skeleton component
  const ProfileSkeleton = () => (
    <Card className="rounded">
      <CardHeader className="px-4 py-2">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 h-[28px] pt-0">
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );

  const validateLinkedInUrl = (input: string): boolean => {
    if (!input) return false;
    const linkedInRegex = /^https?:\/\/(?:www\.)?linkedin\.com\/.+/i;
    return linkedInRegex.test(input);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUrl(input);

    if (input.length > 0 && !input.includes("linkedin.com")) {
      setError("URL must contain linkedin.com");
    } else if (input.length > 8 && !validateLinkedInUrl(input)) {
      setError(
        "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
      );
    } else {
      setError("");
    }
  };
  const params = useParams();

  const handleClose = () => {
    setOpen(false);
  };
  const handleGenerateResume = async () => {
    if (!validateLinkedInUrl(url)) {
      setError("Please enter a valid LinkedIn URL before proceeding");
      return;
    }
    if (!params?.id) {
      return;
    }

    setIsGenerating(true); // Set loading state
    try {
      dispatch(setIsAIFeatureRequested(true));
      const result = await api.post("/linkedin/profile", {
        linkedinUrl: url,
        userId: user?._id,
        useAI: useAI,
        AIPromptInstructions: instructions,
        resumeId: params?.id as string,
      });

      if (result.data.success) {
        dispatch(setResumeState(true));
        dispatch(setIsAIFeatureRequested(false));
        setUrl("");
        setInstructions("");
        toast.success(result.data.message);
        handleClose();
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Failed to generate resume");
      setUrl("");
      dispatch(setResumeState(true));
      dispatch(setIsAIFeatureRequested(false));
      setInstructions("");
      handleClose();
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  };

  // const handleGenerateResume = async () => {
  //   if (!validateLinkedInUrl(url)) {
  //     setError("Please enter a valid LinkedIn URL before proceeding");
  //     return;
  //   }
  //   if (!params?.id) {
  //     return;
  //   }

  //   try {
  //     dispatch(setIsAIFeatureRequested(true));
  //     const result = await api.post("/linkedin/profile", {
  //       linkedinUrl: url,
  //       userId: user?._id,
  //       useAI: useAI,
  //       AIPromptInstructions: instructions,
  //       resumeId: params?.id as string,
  //     });

  //     if (result.data.success) {
  //       dispatch(setResumeState(true));
  //       dispatch(setIsAIFeatureRequested(false));
  //       setUrl("");
  //       setInstructions("");
  //       toast.success(result.data.message);
  //       handleClose();
  //     }
  //   } catch (error) {
  //     console.error("Error generating resume:", error);
  //     toast.error("Failed to generate resume");
  //     setUrl("");
  //     dispatch(setResumeState(true));
  //     dispatch(setIsAIFeatureRequested(false));
  //     setInstructions("");
  //     handleClose();
  //   }
  // };

  const handleProfileClick = async (profileId: string) => {
    if (!params?.id) {
      return;
    }
    try {
      dispatch(setIsAIFeatureRequested(true));
      const result = await api.post("/linkedin/profile-by-id", {
        profileId: profileId,
        userId: user?._id,
        resumeId: params?.id as string,
      });

      if (result.data.success) {
        dispatch(setResumeState(true));
        dispatch(setIsAIFeatureRequested(false));
        toast.success(result.data.message);
        handleClose();
      }
    } catch (error) {
      console.error("Error generating resume:", error);
      toast.error("Failed to generate resume");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-xl max-md:w-[90%] rounded">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Linkedin className="h-8 w-8 text-blue-600" />
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Import LinkedIn Profile
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="new"
          className="w-full rounded"
          onValueChange={(value) => {
            if (value === "previous") {
              fetchProfiles();
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2 rounded border">
            <TabsTrigger
              value="new"
              className="flex items-center gap-2 rounded"
            >
              <Linkedin className="h-4 w-4" />
              New Import
            </TabsTrigger>
            <TabsTrigger
              value="previous"
              className="flex items-center gap-2 rounded"
            >
              <History className="h-4 w-4" />
              Previous Imports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="linkedin-url" className="text-sm font-medium">
                  LinkedIn Profile URL
                </Label>
                <div className="mt-1.5 relative">
                  <Input
                    id="linkedin-url"
                    value={url}
                    onChange={handleUrlChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className={`w-full pl-10 rounded ${
                      error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs pt-1 text-gray-500">
                  Free Plan: 0 credits used out of 3 credits.
                </p>
                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="ai-improve" className="text-sm font-medium">
                  Improve with AI{" "}
                  <span className="text-xs text-gray-500">(Recommended)</span>
                </Label>
                <Switch
                  id="ai-improve"
                  checked={useAI}
                  onCheckedChange={setUseAI}
                />
              </div>

              {useAI && (
                <Accordion type="single" collapsible className="border rounded">
                  <AccordionItem value="custom-prompt" className="border-none">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:bg-gray-50 hover:no-underline">
                      <div>
                        Resume Generation Instructions{" "}
                        <span className="text-xs text-gray-500">
                          (Optional)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 pb-4 space-y-2">
                        <Textarea
                          value={instructions}
                          onChange={(e) => setInstructions(e.target.value)}
                          placeholder="Example: My LinkedIn shows 2 years of experience, but I have 4 years total including freelance work. Please highlight my leadership skills and focus on my technical achievements."
                          className="min-h-[120px] resize-none rounded"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {/* <Button
                onClick={handleGenerateResume}
                disabled={!validateLinkedInUrl(url)}
                className="w-full text-white rounded"
              >
                Import and Generate Resume
              </Button> */}
              <Button
                onClick={handleGenerateResume}
                disabled={!validateLinkedInUrl(url) || isGenerating}
                className="w-full text-white rounded"
              >
                {isGenerating ? "Generating..." : "Import and Generate Resume"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="previous" className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search previous imports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform rounded -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            <div className="space-y-3 overflow-y-auto min-h-[219px] max-h-[219px] pr-2 custom-scrollbar">
              {isLoading ? (
                [...Array(3)].map((_, index) => <ProfileSkeleton key={index} />)
              ) : filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => {
                  const { date, time } = formatDateTime(profile.createdAt);
                  console.log("profile isAIGenerated", profile);
                  return (
                    <Card
                      key={profile._id}
                      className="hover:bg-gray-50 cursor-pointer rounded relative"
                      onClick={() => handleProfileClick(profile._id)}
                    >
                      <CardHeader className="px-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {profile.fullName}
                            </CardTitle>
                            <CardDescription>
                              {profile.headline}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 h-[28px] pt-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Imported on: {date} at {time}
                          </p>
                          {profile.isAIGenerated && (
                            <span className="inline-flex items-center justify-center px-1 rounded-[2px] py-0.5 text-xs font-medium  bg-blue-600 text-white">
                              AI
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No profiles found
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button> */}
      </DialogContent>
    </Dialog>
  );
};

export default LinkedInImport;
