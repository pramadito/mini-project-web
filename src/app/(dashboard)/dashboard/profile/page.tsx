"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUpdateProfile from "./_hooks/useUpdateProfile";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    updateProfile({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string | undefined,
      profilePicture: fileInputRef.current?.files?.[0] || null,
      userId: session?.user?.id || "",
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewImage) URL.revokeObjectURL(previewImage);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const removeImage = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (previewImage) URL.revokeObjectURL(previewImage);
    setPreviewImage(null);
  };

  const displayImage = previewImage || session?.user?.profilePicture;
  const initials = session?.user?.name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2) || "US";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Update Profile</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        {/* Profile Picture */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={displayImage} alt={session?.user?.name || "User"} />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex flex-col gap-2">
              <Input
                ref={fileInputRef}
                name="profilePicture"
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
            name="name"
            defaultValue={session?.user?.name || ""}
            disabled={isPending}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={session?.user?.email || ""}
            disabled={isPending}
            required
          />
        </div>

        {/* Bio */}
        {/* <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            defaultValue={session?.user?.bio || ""}
            disabled={isPending}
            rows={4}
          />
        </div> */}

        {/* Read-only fields */}
        <div className="space-y-2">
          <Label>Referral Code</Label>
          <Input
            value={session?.user?.referralCode || "N/A"}
            readOnly
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label>Member Since</Label>
          <Input
            value={session?.user?.createdAt 
              ? new Date(session.user.createdAt).toLocaleDateString() 
              : "N/A"}
            readOnly
            disabled
          />
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}