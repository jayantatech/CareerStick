// import React from "react";

// const PortfolioAndSocialLinks = () => {
//   return (
//     <div>
//       <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
//         Social Links{" "}
//       </h3>
//       <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
//         You can add links to key websites you would like employers to see. This
//         may include your portfolio, LinkedIn profile, or any other significant
//         online presence that demonstrates your qualifications.
//       </p>
//       <div className="w-full h-auto"></div>
//     </div>
//   );
// };

// export default PortfolioAndSocialLinks;

"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddButton from "../AddButton";
import SectionTitle from "../SectionTitle";
import TrashIconComponent from "../TrashIconComponent";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const socialMediaOptions = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "medium", label: "Medium" },
  { value: "behance", label: "Behance" },
  { value: "dribbble", label: "Dribbble" },
  { value: "portfolio", label: "Personal Portfolio" },
  { value: "other", label: "Other" },
];

const SortableLinkItem = ({
  link,
  onDelete,
  onChange,
}: {
  link: SocialLink;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof SocialLink, value: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={link.id}
        className="border rounded overflow-hidden mb-2"
      >
        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 h-[52px] rounded">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <GripVertical
                className="h-5 w-5 text-gray-400 mr-2 cursor-move"
                {...listeners}
              />
              <div className="text-left">
                <div className="font-semibold font-heading text-gray-500 capitalize">
                  {link.platform || "New Social Link"}
                </div>
                <div className="text-sm text-gray-500">{link.url}</div>
              </div>
            </div>
            {/* <Trash2
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(link.id);
              }}
            /> */}
            <TrashIconComponent onDelete={() => onDelete(link.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelSelect
                label="Platform"
                options={socialMediaOptions}
                value={link.platform}
                onChange={(value) => onChange(link.id, "platform", value)}
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="URL"
                inputType="text"
                inputClassName="border-gray-300"
                value={link.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(link.id, "url", e.target.value)
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const PortfolioAndSocialLinks = () => {
  const [links, setLinks] = useState<SocialLink[]>([
    {
      id: "default-link",
      platform: "",
      url: "",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewLink = () => {
    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      platform: "",
      url: "",
    };
    setLinks([...links, newLink]);
  };

  const handleInputChange = (
    id: string,
    field: keyof SocialLink,
    value: string
  ) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setLinks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full h-auto">
      {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[8px]">
        Portfolio and Social Links
      </h3> */}
      <SectionTitle label="Portfolio and Social Links" />
      {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
        Add links to your portfolio, professional profiles, and social media
        accounts. This helps employers get a comprehensive view of your online
        presence and professional achievements.
      </p> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links.map((link) => link.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-link"]}
          >
            {links.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onDelete={deleteLink}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Link" onClick={addNewLink} />
    </div>
  );
};

export default PortfolioAndSocialLinks;
