"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GripVertical } from "lucide-react";
import FloatingLabelInput from "@/components/inputComponents/TextInputField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddButton from "../AddButton";
import SectionTitle from "../SectionTitle";
import TrashIconComponent from "../TrashIconComponent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addSocialLink,
  deleteSocialLink,
  reorderSocialLinks,
  updateSocialLink,
} from "@/lib/store/slices/resumeSlice";

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

const SortableLinkItem = React.memo(
  ({
    link,
    onDelete,
    onChange,
  }: {
    link: SocialLink;
    onDelete: (id: string) => void;
    onChange: (id: string, field: keyof SocialLink, value: string) => void;
  }) => {
    const [localState, setLocalState] = useState(link);
    const debouncedUpdate = useMemo(
      () =>
        debounce((field: keyof SocialLink, value: string) => {
          onChange(link.id, field, value);
        }, 1000),
      [link.id, onChange]
    );

    useEffect(() => {
      setLocalState(link);
    }, [link]);

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: link.id });

    const handleChange = useCallback(
      (field: keyof SocialLink, value: string) => {
        setLocalState((prev) => ({ ...prev, [field]: value }));
        debouncedUpdate(field, value);
      },
      [debouncedUpdate]
    );

    useEffect(() => {
      return () => {
        debouncedUpdate.cancel();
      };
    }, [debouncedUpdate]);

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
                    {localState.platform || "New Social Link"}
                  </div>
                  <div className="text-sm text-gray-500">{localState.url}</div>
                </div>
              </div>
              <TrashIconComponent onDelete={() => onDelete(link.id)} />
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 space-y-4">
            <div className="w-full h-auto flex gap-2">
              <div className="w-1/2">
                <FloatingLabelSelect
                  label="Platform"
                  options={socialMediaOptions}
                  value={localState.platform}
                  onChange={(value) => handleChange("platform", value)}
                />
              </div>
              <div className="w-1/2">
                <FloatingLabelInput
                  label="URL"
                  inputType="text"
                  inputClassName="border-gray-300"
                  value={localState.url}
                  onChange={(e) => handleChange("url", e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </div>
    );
  }
);

SortableLinkItem.displayName = "SortableLinkItem";

const PortfolioAndSocialLinks = () => {
  const dispatch = useAppDispatch();
  const links = useAppSelector((state) => state.resume.socialLinks);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleChange = useCallback(
    (id: string, field: keyof SocialLink, value: string) => {
      dispatch(updateSocialLink({ id, field, value }));
    },
    [dispatch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      dispatch(deleteSocialLink(id));
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        const oldIndex = links.findIndex((item) => item.id === active.id);
        const newIndex = links.findIndex((item) => item.id === over?.id);
        dispatch(reorderSocialLinks({ oldIndex, newIndex }));
      }
    },
    [links, dispatch]
  );

  const addNewLink = useCallback(() => {
    const newLink: SocialLink = {
      id: `link-${Date.now()}`,
      platform: "",
      url: "",
    };
    dispatch(addSocialLink(newLink));
    setExpandedItems((prev) => [...prev, newLink.id]);
  }, [dispatch]);

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Portfolio and Social Links" />
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
            value={expandedItems}
            onValueChange={setExpandedItems}
          >
            {links.map((link) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                onDelete={handleDelete}
                onChange={handleChange}
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
