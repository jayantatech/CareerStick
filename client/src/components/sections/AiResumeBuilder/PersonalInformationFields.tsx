// // fully working code before aws image
// "use client";
// import React, {
//   useState,
//   ChangeEvent,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";
// import Image from "next/image";
// import FloatingLabelInput from "../../inputComponents/TextInputField";
// import { FaUserTie } from "react-icons/fa";
// import { MdCloudUpload } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { updatePersonalInfo } from "@/lib/store/slices/resumeSlice";
// import debounce from "lodash/debounce";
// import { DebouncedFunc } from "lodash";
// import { Skeleton } from "@/components/ui/skeleton";

// interface PersonalInfo {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   address: string;
//   postalCode: string;
//   photo: File | null;
// }

// const PersonalInformationFields = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   const dispatch = useAppDispatch();
//   const reduxPersonalInfo = useAppSelector(
//     (state) => state.resume.personalInfo
//   );
//   const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
//     firstName: reduxPersonalInfo.firstName || "",
//     lastName: reduxPersonalInfo.lastName || "",
//     email: reduxPersonalInfo.email || "",
//     phone: reduxPersonalInfo.phone || "",
//     city: reduxPersonalInfo.city || "",
//     country: reduxPersonalInfo.country || "",
//     address: reduxPersonalInfo.address || "",
//     postalCode: reduxPersonalInfo.postalCode || "",
//     photo: null,
//   });

// useEffect(() => {
//   setPersonalInfo({
//     firstName: reduxPersonalInfo.firstName || "",
//     lastName: reduxPersonalInfo.lastName || "",
//     email: reduxPersonalInfo.email || "",
//     phone: reduxPersonalInfo.phone || "",
//     city: reduxPersonalInfo.city || "",
//     country: reduxPersonalInfo.country || "",
//     address: reduxPersonalInfo.address || "",
//     postalCode: reduxPersonalInfo.postalCode || "",
//     photo: null,
//   });
// }, [reduxPersonalInfo]);

//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);

//   // Create debouncedUpdateRedux inside the component to properly track dependencies
//   const debouncedFnRef =
//     useRef<DebouncedFunc<(field: keyof PersonalInfo, value: string) => void>>();

//   // Cleanup debounce on unmount
//   useEffect(() => {
//     debouncedFnRef.current = debounce(
//       (field: keyof PersonalInfo, value: string) => {
//         dispatch(updatePersonalInfo({ [field]: value }));
//       },
//       1000
//     );

//     // Cleanup
//     return () => {
//       debouncedFnRef.current?.cancel();
//     };
//   }, [dispatch]);

//   const handleInputChange = useCallback(
//     (field: keyof PersonalInfo) => (e: ChangeEvent<HTMLInputElement>) => {
//       const value = e.target.value;

//       // Update local state immediately
//       setPersonalInfo((prev) => ({
//         ...prev,
//         [field]: value,
//       }));

//       // Call the debounced function
//       debouncedFnRef.current?.(field, value);
//     },
//     []
//   );

//   const handlePhotoUpload = useCallback(
//     (e: ChangeEvent<HTMLInputElement>) => {
//       const file = e.target.files?.[0];
//       if (file) {
//         setPersonalInfo((prev) => ({
//           ...prev,
//           photo: file,
//         }));

//         // Create preview URL for the uploaded photo
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPhotoPreview(reader.result as string);
//         };
//         reader.readAsDataURL(file);

//         // Update Redux immediately for photo
//         dispatch(updatePersonalInfo({ photo: file }));
//       }
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
// <div>
//   <Skeleton
//     className={`w-full h-[340px] bg-blue-50 ${
//       isLoading ? "block" : "hidden"
//     }`}
//   />
//   <div className={`${isLoading ? "hidden" : "block"}`}>
//     <h3 className="font-heading font-semibold text-[16px] text-gray-900">
//       Personal Information
//     </h3>
//     <div className="flex flex-col gap-4">
//       <div className="w-1/3 h-[94px] flex items-end justify-start gap-1">
//         <label
//           htmlFor="photo-upload"
//           className="cursor-pointer flex items-end gap-1"
//         >
//           <div className="w-[80px] h-[80px] border rounded flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-500 overflow-hidden relative">
//             {photoPreview ? (
//               <Image
//                 src={photoPreview}
//                 alt="Profile preview"
//                 fill
//                 sizes="80px"
//                 className="object-cover"
//                 priority
//               />
//             ) : (
//               <FaUserTie className="text-5xl" />
//             )}
//           </div>
//           <div>
//             <MdCloudUpload className="text-xl text-gray-400" />
//             <p className="font-semibold text-gray-400 text-[14px]">
//               Upload Photo
//             </p>
//           </div>
//         </label>
//         <input
//           id="photo-upload"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handlePhotoUpload}
//         />
//       </div>

//       <div className="w-full h-auto flex items-center justify-center gap-2">
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="First Name"
//             inputType="text"
//             value={personalInfo.firstName}
//             onChange={handleInputChange("firstName")}
//           />
//         </div>
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Last Name"
//             inputType="text"
//             value={personalInfo.lastName}
//             onChange={handleInputChange("lastName")}
//           />
//         </div>
//       </div>

//       <div className="w-full h-auto flex items-center justify-center gap-2">
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Email"
//             inputType="email"
//             value={personalInfo.email}
//             onChange={handleInputChange("email")}
//           />
//         </div>
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Phone"
//             inputType="text"
//             value={personalInfo.phone}
//             onChange={handleInputChange("phone")}
//           />
//         </div>
//       </div>

//       <div className="w-full h-auto flex items-center justify-center gap-2">
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="City"
//             inputType="text"
//             value={personalInfo.city}
//             onChange={handleInputChange("city")}
//           />
//         </div>
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Country"
//             inputType="text"
//             value={personalInfo.country}
//             onChange={handleInputChange("country")}
//           />
//         </div>
//       </div>

//       <div className="w-full h-auto flex items-center justify-center gap-2">
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Address"
//             inputType="text"
//             value={personalInfo.address}
//             onChange={handleInputChange("address")}
//           />
//         </div>
//         <div className="w-1/2 h-auto">
//           <FloatingLabelInput
//             label="Postal Code"
//             inputType="text"
//             value={personalInfo.postalCode}
//             onChange={handleInputChange("postalCode")}
//           />
//         </div>
//       </div>
//     </div>
//   </div>{" "}
// </div>
//   );
// };

// export default PersonalInformationFields;

import React, {
  useState,
  ChangeEvent,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Image from "next/image";
import FloatingLabelInput from "../../inputComponents/TextInputField";
import { FaUserTie } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updatePersonalInfo } from "@/lib/store/slices/resumeSlice";
import debounce from "lodash/debounce";
import { DebouncedFunc } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { uploadToS3 } from "@/lib/utils/s3";
// import { uploadToS3 } from "@/lib/utils/s3";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: string | File;
}

const PersonalInformationFields = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const reduxPersonalInfo = useAppSelector(
    (state) => state.resume.personalInfo
  );
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: reduxPersonalInfo.firstName || "",
    lastName: reduxPersonalInfo.lastName || "",
    email: reduxPersonalInfo.email || "",
    phone: reduxPersonalInfo.phone || "",
    city: reduxPersonalInfo.city || "",
    country: reduxPersonalInfo.country || "",
    address: reduxPersonalInfo.address || "",
    postalCode: reduxPersonalInfo.postalCode || "",
    photo: reduxPersonalInfo.photo || "",
  });

  useEffect(() => {
    setPersonalInfo({
      firstName: reduxPersonalInfo.firstName || "",
      lastName: reduxPersonalInfo.lastName || "",
      email: reduxPersonalInfo.email || "",
      phone: reduxPersonalInfo.phone || "",
      city: reduxPersonalInfo.city || "",
      country: reduxPersonalInfo.country || "",
      address: reduxPersonalInfo.address || "",
      postalCode: reduxPersonalInfo.postalCode || "",
      photo: reduxPersonalInfo.photo || "",
    });
  }, [reduxPersonalInfo]);

  // Create debouncedUpdateRedux inside the component to properly track dependencies
  const debouncedFnRef =
    useRef<DebouncedFunc<(field: keyof PersonalInfo, value: string) => void>>();

  // Cleanup debounce on unmount
  useEffect(() => {
    debouncedFnRef.current = debounce(
      (field: keyof PersonalInfo, value: string) => {
        dispatch(updatePersonalInfo({ [field]: value }));
      },
      1000
    );

    // Cleanup
    return () => {
      debouncedFnRef.current?.cancel();
    };
  }, [dispatch]);

  const handleInputChange = useCallback(
    (field: keyof PersonalInfo) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPersonalInfo((prev) => ({
        ...prev,
        [field]: value,
      }));
      debouncedFnRef.current?.(field, value);
    },
    []
  );

  const handlePhotoUpload = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const maxFileSize = 10 * 1024 * 1024; // 5MB in bytes

        // Validate the file size
        if (file.size > maxFileSize) {
          alert("File size exceeds the 10MB limit.");
          return; // Exit the function if file is too large
        }
        // Upload the file to S3
        const photoUrl = await uploadToS3(file);
        console.log("photoUrl", photoUrl);
        setPersonalInfo((prev) => ({
          ...prev,
          photo: file,
        }));

        // Create preview URL for the uploaded photo
        const reader = new FileReader();
        reader.onloadend = () => {
          // setPhotoPreview(reader.result as string);
          setPersonalInfo((prev) => ({
            ...prev,
            photo: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);

        // Update Redux immediately for photo
        dispatch(updatePersonalInfo({ photo: photoUrl }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Skeleton
        className={`w-full h-[340px] bg-blue-50 ${
          isLoading ? "block" : "hidden"
        }`}
      />
      <div className={`${isLoading ? "hidden" : "block"}`}>
        <h3 className="font-heading font-semibold text-[16px] text-gray-900">
          Personal Information
        </h3>
        <div className="flex flex-col gap-4">
          <div className="w-1/3 h-[94px] flex items-end justify-start gap-1">
            <label
              htmlFor="photo-upload"
              className="cursor-pointer flex items-end gap-1"
            >
              <div className="w-[80px] h-[80px] border rounded flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-500 overflow-hidden relative">
                {personalInfo.photo ? (
                  <Image
                    src={personalInfo.photo as string}
                    alt="Profile preview"
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <FaUserTie className="text-5xl" />
                )}
              </div>
              <div>
                <MdCloudUpload className="text-xl text-gray-400" />
                <p className="font-semibold text-gray-400 text-[14px]">
                  Upload Photo
                </p>
              </div>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <div className="w-full h-auto flex items-center justify-center gap-2">
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="First Name"
                inputType="text"
                value={personalInfo.firstName}
                onChange={handleInputChange("firstName")}
              />
            </div>
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Last Name"
                inputType="text"
                value={personalInfo.lastName}
                onChange={handleInputChange("lastName")}
              />
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center gap-2">
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Email"
                inputType="email"
                value={personalInfo.email}
                onChange={handleInputChange("email")}
              />
            </div>
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Phone"
                inputType="text"
                value={personalInfo.phone}
                onChange={handleInputChange("phone")}
              />
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center gap-2">
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="City"
                inputType="text"
                value={personalInfo.city}
                onChange={handleInputChange("city")}
              />
            </div>
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Country"
                inputType="text"
                value={personalInfo.country}
                onChange={handleInputChange("country")}
              />
            </div>
          </div>

          {/* <div className="w-full h-auto flex items-center justify-center gap-2">
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Address"
                inputType="text"
                value={personalInfo.address}
                onChange={handleInputChange("address")}
              />
            </div>
            <div className="w-1/2 h-auto">
              <FloatingLabelInput
                label="Postal Code"
                inputType="text"
                value={personalInfo.postalCode}
                onChange={handleInputChange("postalCode")}
              />
            </div>
          </div> */}
        </div>
      </div>{" "}
    </div>
  );
};

export default PersonalInformationFields;
