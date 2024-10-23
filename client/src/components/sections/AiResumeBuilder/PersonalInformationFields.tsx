"use client";
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import FloatingLabelInput from "../../inputComponents/TextInputField";
import { FaUserTie } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updatePersonalInfo } from "@/lib/store/slices/resumeSlice";
import debounce from "lodash/debounce";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  address: string;
  postalCode: string;
  photo: File | null;
}

const PersonalInformationFields = () => {
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
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Debounced function to update Redux store
  const debouncedUpdateRedux = useCallback(
    debounce((field: keyof PersonalInfo, value: string) => {
      dispatch(updatePersonalInfo({ [field]: value }));
    }, 1000),
    [dispatch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedUpdateRedux.cancel();
    };
  }, [debouncedUpdateRedux]);

  const handleInputChange =
    (field: keyof PersonalInfo) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // Update local state immediately
      setPersonalInfo((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Debounced update to Redux
      debouncedUpdateRedux(field, value);
    };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPersonalInfo((prev) => ({
        ...prev,
        photo: file,
      }));

      // Create preview URL for the uploaded photo
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Update Redux immediately for photo
      dispatch(updatePersonalInfo({ photo: file }));
    }
  };

  return (
    <>
      <h3 className="font-heading font-semibold text-[16px] text-gray-900">
        Personal Information
      </h3>
      <div className="flex flex-col gap-4">
        <div className="w-1/3 h-[94px] flex items-end justify-start gap-1">
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex items-end gap-1"
          >
            <div className="w-[80px] h-[80px] border rounded flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-500 overflow-hidden">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
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

        <div className="w-full h-auto flex items-center justify-center gap-2">
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
        </div>
      </div>
    </>
  );
};

export default PersonalInformationFields;
