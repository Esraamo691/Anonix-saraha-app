import { Card, Input, Textarea, Button, Avatar, Form } from "@heroui/react";
import {
  FaUserEdit,
  FaLink,
  FaUserAstronaut,
  FaEnvelope,
} from "react-icons/fa";
import ProfileImageUpload from "../../Components/Account/ProfileImageUpload";
import ChangePassword from "../../Components/Account/ChangePassword";
import AccountDangerZone from "../../Components/Account/AccountDangerZone";
import LogoImg from "../../assets/images/download.jpg";
import { useEffect, useState } from "react";
import {
  getCurrentUser,
  updateProfile,
  updateProfilePicture,
} from "../../services/profileServices";
import { Snippet } from "@heroui/react";
import { baseURL, uploadsURL } from "../../consts";
import { toast } from "react-toastify";

const buildImageUrl = (profilePicture, timestamp) => {
  if (!profilePicture) return null;
  return `${uploadsURL}/${profilePicture}?t=${timestamp}`;
};

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        console.log("USER DATA:", data);
        setUser(data);
      } catch (err) {
        console.log("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleImageUpload = async (file, previewUrl) => {
    if (!file) return;

    try {
      setUploading(true);

      // preview فوري
      if (previewUrl) {
        setLocalPreviewUrl(previewUrl);
      }

      console.log("FILE:", file);

      // upload
      const res = await updateProfilePicture(file);

      console.log("UPLOAD RESPONSE:", res);

      // refresh user
      const data = await getCurrentUser();

      console.log("UPDATED USER:", data);

      setUser(data);

      setImageTimestamp(Date.now());
    } catch (err) {
      console.log("UPLOAD ERROR:", err);
    } finally {
      setUploading(false);
    }
  };
  // في الـ avatarSrc
  const avatarSrc =
    localPreviewUrl ||
    buildImageUrl(user?.profilePicture, imageTimestamp) ||
    LogoImg;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser);
      setFormData({ firstName: "", lastName: "", bio: "" });
      toast.success("updated successfully");
      console.log("UPDATED USER:", updatedUser);
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  // const avatarSrc =
  //   buildImageUrl(user?.profilePicture, imageTimestamp) || LogoImg;

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400">
            Manage your profile, security and account preferences
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ===== الكارد الجانبي ===== */}
          <aside className="lg:col-span-1">
            <Card
              className="
                overflow-hidden
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-6
                shadow-[0_0_45px_rgba(0,80,255,0.18)]
                sticky top-24
              "
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-700/30 blur-3xl" />

              <div className="relative space-y-5 text-center">
                <Avatar src={avatarSrc} className="w-20 h-20 mx-auto" />

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                  </h2>
                  <p className="text-gray-400">{user?.email}</p>

                  {/* Bio */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 mt-4">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-cyan-400/5 to-transparent" />
                    <div className="relative flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-400/20">
                        <FaUserAstronaut className="text-blue-400 text-sm" />
                      </div>
                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        About Me
                      </h3>
                    </div>
                    <p className="relative text-sm mt-1 text-gray-300">
                      {user?.bio || "No bio added yet..."}
                    </p>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500/20 blur-3xl" />
                  </div>
                </div>

                <div className="flex justify-center gap-3 text-sm text-gray-400">
                  {user?.confirm && (
                    <span className="flex items-center gap-1">
                      <FaEnvelope className="text-blue-400" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="text-left space-y-2">
                  <p className="flex items-center gap-2 text-sm text-gray-400">
                    <FaLink className="text-blue-400" />
                    Profile URL
                  </p>
                  <div className="snippetBox bg-white/5 border border-white/10 rounded-lg p-3 text-xs">
                    <Snippet
                      className="w-full cursor-pointer max-w-full break-all whitespace-pre-wrap overflow-x-auto custom-scroll"
                      color="primary"
                      variant="bordered"
                    >
                      {user?._id &&
                        `${window.location.origin}/user/${user._id}`}
                    </Snippet>
                  </div>
                </div>
              </div>
            </Card>
          </aside>

          {/* ===== المحتوى الرئيسي ===== */}
          <main className="lg:col-span-2 space-y-8">
            <Card
              className="
                relative overflow-hidden
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl p-6
                shadow-[0_0_45px_rgba(0,80,255,0.18)]
              "
            >
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-700/30 blur-3xl" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <FaUserEdit className="text-blue-500" />
                    <h3 className="text-xl font-semibold">
                      Profile Information
                    </h3>
                  </div>
                  <Button size="sm" color="primary">
                    Edit Profile
                  </Button>
                </div>

                {/* ProfileImageUpload — بتاخد نفس الـ avatarSrc */}
                <ProfileImageUpload
                  currentImage={avatarSrc}
                  onChange={handleImageUpload}
                  disabled={uploading}
                />

                <Form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 w-full">
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      label="First Name"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="Enter your firstName"
                    />
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      label="Last Name"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="Enter your lastName"
                    />
                  </div>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    label="Bio"
                    minRows={3}
                    variant="bordered"
                  />
                  <Button type="submit" color="primary">
                    Save Changes
                  </Button>
                </Form>
              </div>
            </Card>

            <ChangePassword />
            <AccountDangerZone />
          </main>
        </div>
      </div>
    </div>
  );
}
