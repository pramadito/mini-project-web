"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash } from "lucide-react";
import useUpdateProfile from "./_hooks/useUpdateProfile";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Updated schema with password validation
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal('')),
  confirmPassword: z.string().optional(),
}).refine(data => {
  if (data.password && !data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Confirm password is required when changing password",
  path: ["confirmPassword"],
}).refine(data => {
  if (data.password && data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});

export default function ProfilePage() {
  const { data: session } = useSession();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    watch
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      
      password: "",
      confirmPassword: "",
    }
  });

  // Set form values when session loads
  useEffect(() => {
    reset({
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      
      password: "",
      confirmPassword: "",
    });
  }, [session, reset]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const onSubmit = (data: any) => {
    const formData = new FormData();
    
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("userId", session?.user?.id || "");
    
    if (data.bio) formData.append("bio", data.bio);
    if (data.password) formData.append("password", data.password);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("profilePicture", fileInputRef.current.files[0]);
    }

    updateProfile({
      ...data,
      userId: session?.user?.id || "",
      profilePicture: fileInputRef.current?.files?.[0] || null,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const removeImage = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setPreviewImage(null);
  };

  const displayImage = previewImage || session?.user?.profilePicture;
  const initials = session?.user?.name?.match(/\b\w/g)?.join("").toUpperCase() || "US";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
        {/* Profile Picture */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 border">
              <AvatarImage src={displayImage} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2 flex-1">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isPending}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                disabled={!previewImage || isPending}
              >
                <Trash className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            disabled={isPending}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            {...register("bio")}
            disabled={isPending}
            rows={4}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            disabled={isPending}
            placeholder="Leave blank to keep current"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            disabled={isPending}
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}