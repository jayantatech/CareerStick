// "use client";

// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import debounce from "lodash/debounce";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { GripVertical } from "lucide-react";
// import FloatingLabelInput from "@/components/inputComponents/TextInputField";
// import {
//   DndContext,
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragEndEvent,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   sortableKeyboardCoordinates,
//   useSortable,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { TextareaField } from "@/components/inputComponents/TextareaField";
// import FloatingLabelSelect from "@/components/SelectFieldComponent";
// import AddButton from "@/components/AddButton";
// import SectionTitle from "@/components/SectionTitle";
// import SubSectionTitle from "@/components/SubSectionTitle";
// import TrashIconComponent from "@/components/TrashIconComponent";
// import {
//   addCertificate,
//   updateCertificate,
//   deleteCertificate,
//   reorderCertificates,
// } from "@/lib/store/slices/resumeSlice";
// import { Certificate } from "@/lib/types/resumeInput";
// import { months } from "../../../../public/content/generalFieldsData";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// interface MonthYearPickerProps {
//   labelFirst: string;
//   labelSecond: string;
//   value: { month: string; year: string };
//   onChange: (value: { month: string; year: string }) => void;
//   disabled?: boolean;
// }

// const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
//   labelFirst,
//   labelSecond,
//   value,
//   onChange,
//   disabled = false,
// }) => {
//   const years = Array.from({ length: 51 }, (_, i) => {
//     const year = 2024 - i;
//     return { value: year.toString(), label: year.toString() };
//   });

//   const handleMonthChange = (newMonth: string) => {
//     onChange({ ...value, month: newMonth });
//   };

//   const handleYearChange = (newYear: string) => {
//     onChange({ ...value, year: newYear });
//   };

//   return (
//     <div className="relative w-full flex items-center justify-center">
//       <div className="flex gap-2 w-full items-center justify-center">
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelFirst}
//             options={months}
//             value={value.month}
//             onChange={handleMonthChange}
//             disabled={disabled}
//           />
//         </div>
//         <div className="w-1/2">
//           <FloatingLabelSelect
//             label={labelSecond}
//             options={years}
//             value={value.year}
//             onChange={handleYearChange}
//             disabled={disabled}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// interface SortableCertificationItemProps {
//   certification: Certificate;
//   onDelete: (id: string) => void;
//   onChange: (id: string, field: keyof Certificate, value: string) => void;
// }

// const SortableCertificationItem: React.FC<SortableCertificationItemProps> = ({
//   certification,
//   onDelete,
//   onChange,
// }) => {
//   const [localCertification, setLocalCertification] = useState(certification);
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({
//       id: certification.id,
//     });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   useEffect(() => {
//     setLocalCertification(certification);
//   }, [certification]);

//   const debouncedReduxUpdate = useCallback(
//     (
//       field: keyof Certificate,
//       value: string | boolean | { month: string; year: string }
//     ) => {
//       onChange(certification.id, field, value as string);
//     },
//     [certification.id, onChange]
//   );

//   // Create a memoized debounced function
//   const debouncedUpdate = useMemo(
//     () => debounce(debouncedReduxUpdate, 1000),
//     [debouncedReduxUpdate]
//   );

//   // Cleanup the debounced function on unmount
//   useEffect(() => {
//     return () => {
//       debouncedUpdate.cancel();
//     };
//   }, [debouncedUpdate]);

//   const handleChange = (
//     field: keyof Certificate,
//     value: string | boolean | { month: string; year: string }
//   ) => {
//     setLocalCertification((prev) => ({ ...prev, [field]: value }));
//     debouncedUpdate(field, value);
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes}>
//       <AccordionItem
//         value={certification.id}
//         className="border rounded overflow-hidden mb-2"
//       >
//         <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-gray-50 bg-red-d400 rounded">
//           <div className="flex justify-between items-center w-full">
//             <div className="flex items-center">
//               <GripVertical
//                 className="h-5 w-5 text-gray-400 mr-2 cursor-move"
//                 {...listeners}
//               />
//               <div className="text-left">
//                 <div className="font-semibold font-heading text-gray-500">
//                   {localCertification.name || "New Certification"}
//                   {localCertification.issuingOrganization
//                     ? ` by ${localCertification.issuingOrganization}`
//                     : ""}
//                 </div>
//                 <div className="text-sm text-gray-500">
//                   {localCertification.issueDate?.month &&
//                   localCertification.issueDate.year
//                     ? `Issued: ${localCertification.issueDate?.month} ${localCertification.issueDate?.year}`
//                     : "Issue Date"}{" "}
//                   {!localCertification.isNeverExpires &&
//                     localCertification.expirationDate?.month &&
//                     localCertification.expirationDate?.year &&
//                     `- Expires: ${localCertification.expirationDate?.month} ${localCertification.expirationDate?.year}`}
//                   {localCertification.isNeverExpires && "- No Expiration"}
//                 </div>
//               </div>
//             </div>
//             <TrashIconComponent onDelete={() => onDelete(certification.id)} />
//           </div>
//         </AccordionTrigger>
//         <AccordionContent className="px-4 py-2 space-y-4">
//           <div className="w-full h-auto flex gap-2 max-md:gap-3 max-md:flex-col">
//             <div className="w-1/2 max-md:w-full">
//               <FloatingLabelInput
//                 label="Certification Name"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localCertification.name}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("name", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2 max-md:w-full">
//               <FloatingLabelInput
//                 label="Issuing Organization"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localCertification.issuingOrganization}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("issuingOrganization", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="flex min-m-desktop:space-x-4 w-full  max-m-desktop:flex-col flex-row  max-m-desktop:h-auto  gap-y-3 xl:gap-2">
//             <MonthYearPicker
//               labelFirst="Issue Month"
//               labelSecond="Issue Year"
//               value={localCertification.issueDate}
//               onChange={(value) => handleChange("issueDate", value)}
//             />
//             <MonthYearPicker
//               labelFirst="Exp Month"
//               labelSecond="Exp Year"
//               value={localCertification.expirationDate}
//               onChange={(value) => handleChange("expirationDate", value)}
//               disabled={localCertification.isNeverExpires}
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={localCertification.isNeverExpires}
//               onChange={(e) => handleChange("isNeverExpires", e.target.checked)}
//               className="mr-2"
//             />
//             <label>This certification does not expire</label>
//           </div>
//           <div className="w-full h-auto flex gap-2">
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Credential ID"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localCertification.credentialId}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("credentialId", e.target.value)
//                 }
//               />
//             </div>
//             <div className="w-1/2">
//               <FloatingLabelInput
//                 label="Verification URL"
//                 inputType="text"
//                 inputClassName="border-gray-300"
//                 value={localCertification.verificationUrl}
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   handleChange("verificationUrl", e.target.value)
//                 }
//               />
//             </div>
//           </div>
//           <div className="relative">
//             <SubSectionTitle label="Certification Description" />
//             <TextareaField
//               placeholder="Example: Advanced certification in cloud architecture, covering deployment, security, and optimization of cloud infrastructure. Demonstrates expertise in designing scalable and resilient cloud solutions."
//               value={localCertification.description}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
//                 handleChange("description", e.target.value)
//               }
//             />
//           </div>
//         </AccordionContent>
//       </AccordionItem>
//     </div>
//   );
// };

// const CertificationsSection: React.FC = () => {
//   const dispatch = useAppDispatch();

//   const certificates = useAppSelector((state) => state.resume.certificate);
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Add a default certification if none exists
//   useEffect(() => {
//     // Only add default if certificates array is completely empty
//     if (!certificates || certificates.length === 0) {
//       const defaultCertification: Certificate = {
//         id: `certification-${Date.now()}`,
//         name: "",
//         issuingOrganization: "",
//         issueDate: { month: "", year: "" },
//         expirationDate: { month: "", year: "" },
//         credentialId: "",
//         verificationUrl: "",
//         description: "",
//         isNeverExpires: false,
//       };

//       // Use a ref to ensure this only runs once
//       const timeoutId = setTimeout(() => {
//         dispatch(addCertificate(defaultCertification));
//       }, 0);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [certificates, dispatch]);

//   const addNewCertification = () => {
//     const newCertification: Certificate = {
//       id: `certification-${Date.now()}`,
//       name: "",
//       issuingOrganization: "",
//       issueDate: { month: "", year: "" },
//       expirationDate: { month: "", year: "" },
//       credentialId: "",
//       verificationUrl: "",
//       description: "",
//       isNeverExpires: false,
//     };
//     dispatch(addCertificate(newCertification));
//   };

//   const handleInputChange = (
//     id: string,
//     field: keyof Certificate,
//     value: string
//   ) => {
//     dispatch(updateCertificate({ id, field, value }));
//   };

//   const deleteCertificationHandler = (id: string) => {
//     // Prevent deleting if it's the last certification
//     if (certificates.length > 1) {
//       dispatch(deleteCertificate(id));
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (active.id !== over?.id) {
//       const oldIndex = certificates.findIndex((cert) => cert.id === active.id);
//       const newIndex = certificates.findIndex((cert) => cert.id === over?.id);

//       dispatch(reorderCertificates({ oldIndex, newIndex }));
//     }
//   };

//   return (
//     <div className="w-full h-auto">
//       <SectionTitle label="Certifications" />
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={certificates.map((cert) => cert.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           <Accordion
//             type="multiple"
//             className="w-full space-y-2"
//             defaultValue={certificates.map((cert) => cert.id)}
//           >
//             {certificates.map((certification) => (
//               <SortableCertificationItem
//                 key={certification.id}
//                 certification={certification}
//                 onDelete={deleteCertificationHandler}
//                 onChange={handleInputChange}
//               />
//             ))}
//           </Accordion>
//         </SortableContext>
//       </DndContext>
//       <AddButton label="Add New Certification" onClick={addNewCertification} />
//     </div>
//   );
// };

// export default CertificationsSection;

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
// import QuillField from "@/components/QuillField";

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
import FloatingLabelSelect from "@/components/SelectFieldComponent";
import AddButton from "@/components/AddButton";
import SectionTitle from "@/components/SectionTitle";
import SubSectionTitle from "@/components/SubSectionTitle";
import TrashIconComponent from "@/components/TrashIconComponent";
import {
  addCertificate,
  updateCertificate,
  deleteCertificate,
  reorderCertificates,
} from "@/lib/store/slices/resumeSlice";
import { Certificate } from "@/lib/types/resumeInput";
import { months } from "../../../../public/content/generalFieldsData";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import QuillField from "@/components/inputComponents/ResumeCodeDescription";

interface MonthYearPickerProps {
  labelFirst: string;
  labelSecond: string;
  value: { month: string; year: string };
  onChange: (value: { month: string; year: string }) => void;
  disabled?: boolean;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
  labelFirst,
  labelSecond,
  value,
  onChange,
  disabled = false,
}) => {
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

interface SortableCertificationItemProps {
  certification: Certificate;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Certificate, value: string) => void;
}

const SortableCertificationItem: React.FC<SortableCertificationItemProps> = ({
  certification,
  onDelete,
  onChange,
}) => {
  const [localCertification, setLocalCertification] = useState(certification);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: certification.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    setLocalCertification(certification);
  }, [certification]);

  const debouncedReduxUpdate = useCallback(
    (
      field: keyof Certificate,
      value: string | boolean | { month: string; year: string }
    ) => {
      onChange(certification.id, field, value as string);
    },
    [certification.id, onChange]
  );

  const debouncedUpdate = useMemo(
    () => debounce(debouncedReduxUpdate, 1000),
    [debouncedReduxUpdate]
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleChange = (
    field: keyof Certificate,
    value: string | boolean | { month: string; year: string }
  ) => {
    setLocalCertification((prev) => ({ ...prev, [field]: value }));
    debouncedUpdate(field, value);
  };

  const handleDescriptionChange = useCallback(
    (content: string) => {
      setLocalCertification((prev) => ({
        ...prev,
        description: content,
      }));
      onChange(certification.id, "description", content);
    },
    [certification.id, onChange]
  );

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
                  {localCertification.name || "New Certification"}
                  {localCertification.issuingOrganization
                    ? ` by ${localCertification.issuingOrganization}`
                    : ""}
                </div>
                <div className="text-sm text-gray-500">
                  {localCertification.issueDate?.month &&
                  localCertification.issueDate.year
                    ? `Issued: ${localCertification.issueDate?.month} ${localCertification.issueDate?.year}`
                    : "Issue Date"}{" "}
                  {!localCertification.isNeverExpires &&
                    localCertification.expirationDate?.month &&
                    localCertification.expirationDate?.year &&
                    `- Expires: ${localCertification.expirationDate?.month} ${localCertification.expirationDate?.year}`}
                  {localCertification.isNeverExpires && "- No Expiration"}
                </div>
              </div>
            </div>
            <TrashIconComponent onDelete={() => onDelete(certification.id)} />
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-4">
          <div className="w-full h-auto flex gap-2 max-md:gap-3 max-md:flex-col">
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Certification Name"
                inputType="text"
                inputClassName="border-gray-300"
                value={localCertification.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("name", e.target.value)
                }
              />
            </div>
            <div className="w-1/2 max-md:w-full">
              <FloatingLabelInput
                label="Issuing Organization"
                inputType="text"
                inputClassName="border-gray-300"
                value={localCertification.issuingOrganization}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("issuingOrganization", e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex min-m-desktop:space-x-4 w-full max-m-desktop:flex-col flex-row max-m-desktop:h-auto gap-y-3 xl:gap-2">
            <MonthYearPicker
              labelFirst="Issue Month"
              labelSecond="Issue Year"
              value={localCertification.issueDate}
              onChange={(value) => handleChange("issueDate", value)}
            />
            <MonthYearPicker
              labelFirst="Exp Month"
              labelSecond="Exp Year"
              value={localCertification.expirationDate}
              onChange={(value) => handleChange("expirationDate", value)}
              disabled={localCertification.isNeverExpires}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={localCertification.isNeverExpires}
              onChange={(e) => handleChange("isNeverExpires", e.target.checked)}
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
                value={localCertification.credentialId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("credentialId", e.target.value)
                }
              />
            </div>
            <div className="w-1/2">
              <FloatingLabelInput
                label="Verification URL"
                inputType="text"
                inputClassName="border-gray-300"
                value={localCertification.verificationUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("verificationUrl", e.target.value)
                }
              />
            </div>
          </div>
          <div className="relative">
            <SubSectionTitle label="Certification Description" />
            <QuillField
              value={localCertification.description}
              onChange={handleDescriptionChange}
              placeholderText="Example: Advanced certification in cloud architecture, covering deployment, security, and optimization of cloud infrastructure. Demonstrates expertise in designing scalable and resilient cloud solutions."
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};

const CertificationsSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const certificates = useAppSelector((state) => state.resume.certificate);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!certificates || certificates.length === 0) {
      const defaultCertification: Certificate = {
        id: `certification-${Date.now()}`,
        name: "",
        issuingOrganization: "",
        issueDate: { month: "", year: "" },
        expirationDate: { month: "", year: "" },
        credentialId: "",
        verificationUrl: "",
        description: "",
        isNeverExpires: false,
      };

      const timeoutId = setTimeout(() => {
        dispatch(addCertificate(defaultCertification));
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [certificates, dispatch]);

  const addNewCertification = () => {
    const newCertification: Certificate = {
      id: `certification-${Date.now()}`,
      name: "",
      issuingOrganization: "",
      issueDate: { month: "", year: "" },
      expirationDate: { month: "", year: "" },
      credentialId: "",
      verificationUrl: "",
      description: "",
      isNeverExpires: false,
    };
    dispatch(addCertificate(newCertification));
  };

  const handleInputChange = (
    id: string,
    field: keyof Certificate,
    value: string
  ) => {
    dispatch(updateCertificate({ id, field, value }));
  };

  const deleteCertificationHandler = (id: string) => {
    if (certificates.length > 1) {
      dispatch(deleteCertificate(id));
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = certificates.findIndex((cert) => cert.id === active.id);
      const newIndex = certificates.findIndex((cert) => cert.id === over?.id);

      dispatch(reorderCertificates({ oldIndex, newIndex }));
    }
  };

  return (
    <div className="w-full h-auto">
      <SectionTitle label="Certifications" />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={certificates.map((cert) => cert.id)}
          strategy={verticalListSortingStrategy}
        >
          <Accordion
            type="multiple"
            className="w-full space-y-2"
            defaultValue={certificates.map((cert) => cert.id)}
          >
            {certificates.map((certification) => (
              <SortableCertificationItem
                key={certification.id}
                certification={certification}
                onDelete={deleteCertificationHandler}
                onChange={handleInputChange}
              />
            ))}
          </Accordion>
        </SortableContext>
      </DndContext>
      <AddButton label="Add New Certification" onClick={addNewCertification} />
    </div>
  );
};

export default CertificationsSection;
