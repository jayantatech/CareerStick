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
import { TextareaField } from "@/components/inputComponents/TextareaField";
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";

interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: { month: string; year: string };
  expirationDate: { month: string; year: string };
  credentialId: string;
  url: string;
  description: string;
  isNeverExpires: boolean;
}

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
  disabled?: boolean;
}

const MonthYearPicker = ({
  labelFirst,
  labelSecond,
  value,
  onChange,
  disabled = false,
}: MonthYearPickerProps) => {
  const months = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const years = Array.from({ length: 51 }, (_, i) => {
    const year = 2024 - i;
    return { value: year.toString(), label: year.toString() };
  });

  const handleMonthChange = (newMonth: string) => {
    onChange({ ...value, month: newMonth });
  };

  const handleYearChange = (newYear: string) => {
    onChange({ ...value, year: newYear });
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="flex gap-2 w-full items-center justify-center">
        <div className="w-1/2">
          <FloatingLabelSelect
            label={labelFirst}
            options={months}
            value={value.month}
            onChange={handleMonthChange}
            disabled={disabled}
          />
        </div>
        <div className="w-1/2">
          <FloatingLabelSelect
            label={labelSecond}
            options={years}
            value={value.year}
            onChange={handleYearChange}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

const SortableCertificationItem = ({
  certification,
  onDelete,
  onChange,
}: {
  certification: Certification;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Certification, value: any) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: certification.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <AccordionItem
        value={certification.id}
        className="border rounded overflow-hidden mb-2"
      >
        <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <GripVertical
                className="h-5 w-5 text-gray-400 mr-2 cursor-move"
                {...listeners}
              />
              <div className="text-left">
                <div className="font-semibold font-heading text-gray-500">
                  {certification.name || "New Certification"}
                  {certification.issuingOrganization
                    ? ` by ${certification.issuingOrganization}`
                    : ""}
                </div>
                <div className="text-sm text-gray-500">
                  {certification.issueDate.month && certification.issueDate.year
                    ? `Issued: ${certification.issueDate.month} ${certification.issueDate.year}`
                    : "Issue Date"}{" "}
                  {!certification.isNeverExpires &&
                    certification.expirationDate.month &&
                    certification.expirationDate.year &&
                    `- Expires: ${certification.expirationDate.month} ${certification.expirationDate.year}`}
                  {certification.isNeverExpires && "- No Expiration"}
                </div>
              </div>
            </div>
            {/* <Trash2
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(certification.id);
              }}
            /> */}
            <TrashIconComponent onDelete={() => onDelete(certification.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Certification Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={certification.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(certification.id, "name", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Issuing Organization"
                inputType="text"
                inputClassName="border-gray-300"
                value={certification.issuingOrganization}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(
                    certification.id,
                    "issuingOrganization",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
          <div className="flex space-x-4 w-full h-[48px]">
            <MonthYearPicker
              labelFirst="Issue Month"
              labelSecond="Issue Year"
              value={certification.issueDate}
              onChange={(value: any) =>
                onChange(certification.id, "issueDate", value)
              }
            />
            <MonthYearPicker
              labelFirst="Expiration Month"
              labelSecond="Expiration Year"
              value={certification.expirationDate}
              onChange={(value: any) =>
                onChange(certification.id, "expirationDate", value)
              }
              disabled={certification.isNeverExpires}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={certification.isNeverExpires}
              onChange={(e) =>
                onChange(certification.id, "isNeverExpires", e.target.checked)
              }
              className="mr-2"
            />
            <label>This certification does not expire</label>
          </div>
          <div className="w-full h-auto flex gap-2">
            <div className="w-1/2">
              <FloatingLabelInput
                label="Credential ID"
                inputType="text"
                inputClassName="border-gray-300"
                value={certification.credentialId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(certification.id, "credentialId", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Verification URL"
                inputType="text"
                inputClassName="border-gray-300"
                value={certification.url}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(certification.id, "url", e.target.value)
                }
              />
            </div>
          </div>
          <div className="relative">
            {/* <h4 className="font-heading font-semibold text-[14px] text-gray-900">
              Certification Description
            </h4> */}
            <SubSectionTitle label="Certification Description" />
            {/* <p className="font-body font-normal text-[15px] text-gray-500 pb-2">
              Describe the skills and knowledge validated by this certification,
              and how it enhances your professional expertise.
            </p> */}
            <TextareaField
              placeholder="Example: Advanced certification in cloud architecture, covering deployment, security, and optimization of cloud infrastructure. Demonstrates expertise in designing scalable and resilient cloud solutions."
              value={certification.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                onChange(certification.id, "description", e.target.value)
              }
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "default-certification",
      name: "",
      issuingOrganization: "",
      issueDate: { month: "", year: "" },
      expirationDate: { month: "", year: "" },
      credentialId: "",
      url: "",
      description: "",
      isNeverExpires: false,
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addNewCertification = () => {
    const newCertification: Certification = {
      id: `certification-${Date.now()}`,
      name: "",
      issuingOrganization: "",
      issueDate: { month: "", year: "" },
      expirationDate: { month: "", year: "" },
      credentialId: "",
      url: "",
      description: "",
      isNeverExpires: false,
    };
    setCertifications([...certifications, newCertification]);
  };

  const handleInputChange = (
    id: string,
    field: keyof Certification,
    value: any
  ) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id
          ? {
              ...cert,
              [field]: value,
              ...(field === "isNeverExpires" && value
                ? { expirationDate: { month: "", year: "" } }
                : {}),
            }
          : cert
      )
    );
  };

  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCertifications((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="w-full h-auto">
      {/* <h3 className="font-heading font-semibold text-[16px] text-black pb-[2px]">
        Certifications
      </h3> */}
      <SectionTitle label="Certifications" />
      {/* <p className="font-body font-normal text-[15px] text-gray-500 mb-4">
        List your professional certifications, including details about the
        issuing organization, validity dates, and the skills they validate. This
        helps demonstrate your expertise and commitment to professional
        development.
      </p> */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={certifications.map((cert) => cert.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={["default-certification"]}
          >
            {certifications.map((certification) => (
              <SortableCertificationItem
                key={certification.id}
                certification={certification}
                onDelete={deleteCertification}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      {/* <Button
        onClick={addNewCertification}
        variant="outline"
        className="mt-4 flex items-center text-primary hover:text-primary-dark"
      >
        <PlusCircle className="mr-2" />
        Add New Certification
      </Button> */}
      <AddButton label="Add New Certification" onClick={addNewCertification} />
    </div>
  );
};

export default CertificationsSection;
