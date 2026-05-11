'use client'

import { useState } from 'react'

import { AdminSidebar } from '@/components/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { supabase } from '@/lib/supabaseClient'

import {
  Search,
  User,
  Lock,
  Ban,
  CheckCircle2,
  Sparkles,
  Menu,
  Mail,
  ShieldCheck,
  UserRound,
  Trash2,
} from 'lucide-react'

type Language = 'en' | 'fr' | 'ar'

export default function AdminProfilePage() {
  const [language, setLanguage] =
    useState<Language>('en')

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [email, setEmail] =
    useState('')

  const [loadingUser, setLoadingUser] =
    useState(false)

  const [userFound, setUserFound] =
    useState<any>(null)

  const [
    profileExists,
    setProfileExists,
  ] = useState(false)

  const [profileData, setProfileData] =
    useState({
      first_name: '',
      last_name: '',
      level: 'A1',
    })

  const [password, setPassword] =
    useState('')

  const [savingProfile, setSavingProfile] =
    useState(false)

  const [
    changingPassword,
    setChangingPassword,
  ] = useState(false)

  const [togglingBan, setTogglingBan] =
    useState(false)

  const [deletingUser, setDeletingUser] =
    useState(false)

  const [
    successMessage,
    setSuccessMessage,
  ] = useState('')

  // 🔥 SEARCH USER
  const handleSearch = async () => {
    if (!email) return

    setLoadingUser(true)

    setUserFound(null)

    setProfileExists(false)

    setSuccessMessage('')

    const response = await fetch(
      '/api/admin/find-user',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      }
    )

    const data =
      await response.json()

    if (!response.ok) {
      alert(
        data.error ||
          'User not found'
      )

      setLoadingUser(false)

      return
    }

    const { data: profile } =
      await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

    if (profile) {
      setProfileExists(true)

      setProfileData({
        first_name:
          profile.first_name ||
          '',

        last_name:
          profile.last_name ||
          '',

        level:
          profile.level || 'A1',
      })

      setUserFound({
        ...data.user,
        is_active:
          profile.is_active,
      })
    } else {
      setProfileExists(false)

      setProfileData({
        first_name: '',
        last_name: '',
        level: 'A1',
      })

      setUserFound({
        ...data.user,
        is_active: false,
      })
    }

    setLoadingUser(false)
  }

  // 🔥 SAVE PROFILE
  const handleSaveProfile =
    async () => {
      if (!userFound) return

      setSavingProfile(true)

      const { error } =
        await supabase
          .from('profiles')
          .upsert({
            id: userFound.id,

            first_name:
              profileData.first_name,

            last_name:
              profileData.last_name,

            level:
              profileData.level,

            is_admin: false,

            is_active:
              userFound.is_active,
          })

      if (error) {
        console.error(error)

        alert(
          'Failed to save profile'
        )

        setSavingProfile(false)

        return
      }

      setProfileExists(true)

      setSuccessMessage(
        '✅ Profile saved successfully'
      )

      setSavingProfile(false)

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }

  // 🔥 CHANGE PASSWORD
  const handleChangePassword =
    async () => {
      if (
        !password ||
        !userFound
      )
        return

      setChangingPassword(true)

      const response =
        await fetch(
          '/api/admin/change-password',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              userId:
                userFound.id,
              password,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        alert(
          data.error ||
            'Failed to change password'
        )

        setChangingPassword(false)

        return
      }

      setPassword('')

      setSuccessMessage(
        '✅ Password changed successfully'
      )

      setChangingPassword(false)

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }

  // 🔥 TOGGLE ACCOUNT
  const handleToggleBan =
    async () => {
      if (!userFound) return

      const confirmAction =
        confirm(
          userFound.is_active
            ? 'Deactivate this account?'
            : 'Activate this account?'
        )

      if (!confirmAction) return

      setTogglingBan(true)

      const { error } =
        await supabase
          .from('profiles')
          .update({
            is_active:
              !userFound.is_active,
          })
          .eq(
            'id',
            userFound.id
          )

      if (error) {
        alert(
          'Failed to update account'
        )

        setTogglingBan(false)

        return
      }

      setUserFound({
        ...userFound,
        is_active:
          !userFound.is_active,
      })

      setSuccessMessage(
        userFound.is_active
          ? '🚫 Account deactivated'
          : '✅ Account activated'
      )

      setTogglingBan(false)

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }

  // 🔥 DELETE ACCOUNT
  const handleDeleteUser =
    async () => {
      if (!userFound) return

      const confirmDelete =
        confirm(
          `Are you sure you want to permanently delete ${userFound.email}?`
        )

      if (!confirmDelete)
        return

      setDeletingUser(true)

      const response =
        await fetch(
          '/api/admin/delete-user',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              userId:
                userFound.id,
            }),
          }
        )

      const data =
        await response.json()

      if (!response.ok) {
        alert(
          data.error ||
            'Failed to delete account'
        )

        setDeletingUser(false)

        return
      }

      setSuccessMessage(
        '🗑️ Account deleted successfully'
      )

      setUserFound(null)

      setProfileExists(false)

      setEmail('')

      setDeletingUser(false)

      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">

      {/* SIDEBAR */}
      <AdminSidebar
        language={language}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <main className="flex-1 h-screen overflow-y-auto">

        {/* HEADER */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 border-b border-white/30">

          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="
                  md:hidden
                  w-12 h-12 rounded-2xl
                  bg-white shadow-md border
                  flex items-center justify-center
                "
              >
                <Menu className="w-6 h-6" />
              </button>

              <div>

                <h1 className="text-4xl font-black tracking-tight">
                  User Management
                </h1>

                <p className="text-muted-foreground mt-1">
                  Manage student profiles and accounts
                </p>

              </div>

            </div>

            <select
              value={language}
              onChange={(e) =>
                setLanguage(
                  e.target.value as Language
                )
              }
              className="
                px-4 py-3 rounded-2xl
                border bg-white shadow-sm
              "
            >
              <option value="en">
                English
              </option>

              <option value="fr">
                Français
              </option>

              <option value="ar">
                العربية
              </option>
            </select>

          </div>
        </div>

        {/* HERO */}
        <div className="max-w-7xl mx-auto px-6 pt-8">

          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-10 text-white shadow-2xl">

            <div className="absolute inset-0 opacity-20">

              <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white blur-3xl" />

              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-300 blur-3xl" />

            </div>

            <div className="relative z-10 max-w-2xl">

              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl mb-5">

                <Sparkles className="w-4 h-4" />

                <span className="text-sm font-semibold">
                  Deutschly Admin
                </span>

              </div>

              <h2 className="text-5xl font-black leading-tight">
                Manage Users Easily
              </h2>

              <p className="text-white/80 text-lg mt-4 leading-relaxed">
                Search users, create profiles, reset passwords
                and manage account access from one place.
              </p>

            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

          {/* SUCCESS */}
          {successMessage && (
            <div className="bg-green-100 border border-green-200 text-green-800 rounded-[28px] p-5 flex items-center gap-4 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg">

                <CheckCircle2 className="w-7 h-7" />

              </div>

              <div>

                <p className="font-bold text-lg">
                  Success
                </p>

                <p className="text-sm opacity-80">
                  {successMessage}
                </p>

              </div>

            </div>
          )}

          {/* SEARCH */}
          <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                  <Search className="w-7 h-7" />

                </div>

                <div>

                  <h3 className="text-3xl font-black">
                    Find User
                  </h3>

                  <p className="text-white/80 mt-1">
                    Search using an email address
                  </p>

                </div>

              </div>
            </div>

            <div className="p-8">

              <div className="flex flex-col md:flex-row gap-4">

                <div className="flex-1 relative">

                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                  <Input
                    type="email"
                    placeholder="student@email.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    className="h-14 rounded-2xl border-2 pl-14"
                  />

                </div>

                <Button
                  onClick={handleSearch}
                  disabled={
                    loadingUser
                  }
                  className="
                    h-14 px-8 rounded-2xl
                    bg-gradient-to-r from-blue-600 to-purple-600
                    hover:opacity-90
                    text-white font-bold shadow-lg
                  "
                >
                  {loadingUser
                    ? 'Searching...'
                    : 'Search User'}
                </Button>

              </div>
            </div>
          </div>

          {/* USER */}
          {userFound && (
            <div className="grid xl:grid-cols-[1fr_360px] gap-8">

              {/* LEFT */}
              <div className="space-y-8">

                {/* USER CARD */}
                <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">

                  <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">

                    <div className="flex items-center gap-5">

                      <div className="w-20 h-20 rounded-[28px] bg-white/20 flex items-center justify-center backdrop-blur-md shadow-xl">

                        <UserRound className="w-10 h-10" />

                      </div>

                      <div>

                        <p className="text-white/70 text-sm">
                          User Account
                        </p>

                        <h2 className="text-3xl font-black mt-1 break-all">
                          {userFound.email}
                        </h2>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3">

                      <div className="bg-white/20 px-5 py-3 rounded-2xl text-sm font-semibold backdrop-blur-md">

                        {profileExists
                          ? '✅ Profile Exists'
                          : '⚠️ No Profile'}

                      </div>

                      <div
                        className={`px-5 py-3 rounded-2xl text-sm font-semibold backdrop-blur-md ${
                          userFound.is_active
                            ? 'bg-green-500/30'
                            : 'bg-red-500/30'
                        }`}
                      >
                        {userFound.is_active
                          ? '✅ Active'
                          : '🚫 Inactive'}
                      </div>

                    </div>
                  </div>
                </div>

                {/* PROFILE */}
                <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 text-white">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <User className="w-7 h-7" />

                      </div>

                      <div>

                        <h3 className="text-3xl font-black">
                          {profileExists
                            ? 'Edit Profile'
                            : 'Create Profile'}
                        </h3>

                        <p className="text-white/80 mt-1">
                          Manage user information
                        </p>

                      </div>

                    </div>
                  </div>

                  <div className="p-8 space-y-7">

                    <div className="grid md:grid-cols-2 gap-6">

                      <div className="space-y-3">

                        <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                          First Name
                        </label>

                        <Input
                          placeholder="John"
                          value={
                            profileData.first_name
                          }
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              first_name:
                                e.target
                                  .value,
                            })
                          }
                          className="h-14 rounded-2xl border-2"
                        />

                      </div>

                      <div className="space-y-3">

                        <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                          Last Name
                        </label>

                        <Input
                          placeholder="Doe"
                          value={
                            profileData.last_name
                          }
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              last_name:
                                e.target
                                  .value,
                            })
                          }
                          className="h-14 rounded-2xl border-2"
                        />

                      </div>

                    </div>

                    <div className="space-y-3">

                      <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        German Level
                      </label>

                      <select
                        value={
                          profileData.level
                        }
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            level:
                              e.target
                                .value,
                          })
                        }
                        className="
                          w-full h-14 rounded-2xl
                          border-2 border-border
                          px-5 bg-white
                        "
                      >
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                      </select>

                    </div>

                    <Button
                      onClick={
                        handleSaveProfile
                      }
                      disabled={
                        savingProfile
                      }
                      className="
                        h-14 px-8 rounded-2xl
                        bg-gradient-to-r from-blue-600 to-purple-600
                        hover:opacity-90
                        text-white font-bold shadow-lg
                      "
                    >
                      {savingProfile
                        ? 'Saving...'
                        : profileExists
                        ? 'Update Profile'
                        : 'Create Profile'}
                    </Button>

                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-8">

                {/* PASSWORD */}
                <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-7 text-white">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <Lock className="w-7 h-7" />

                      </div>

                      <div>

                        <h3 className="text-2xl font-black">
                          Password
                        </h3>

                        <p className="text-white/80 mt-1">
                          Reset user password
                        </p>

                      </div>

                    </div>
                  </div>

                  <div className="p-7 space-y-6">

                    <Input
                      type="password"
                      placeholder="New password"
                      value={password}
                      onChange={(e) =>
                        setPassword(
                          e.target.value
                        )
                      }
                      className="h-14 rounded-2xl border-2"
                    />

                    <Button
                      onClick={
                        handleChangePassword
                      }
                      disabled={
                        changingPassword
                      }
                      className="
                        w-full h-14 rounded-2xl
                        bg-gradient-to-r from-orange-500 to-red-500
                        hover:opacity-90
                        text-white font-bold shadow-lg
                      "
                    >
                      {changingPassword
                        ? 'Changing...'
                        : 'Change Password'}
                    </Button>

                  </div>
                </div>

                {/* STATUS */}
                <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                  <div className="bg-gradient-to-r from-red-500 to-pink-500 p-7 text-white">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <ShieldCheck className="w-7 h-7" />

                      </div>

                      <div>

                        <h3 className="text-2xl font-black">
                          Account Status
                        </h3>

                        <p className="text-white/80 mt-1">
                          Control user access
                        </p>

                      </div>

                    </div>
                  </div>

                  <div className="p-7 space-y-6">

                    <div
                      className={`
                        rounded-2xl p-5 border
                        ${
                          userFound.is_active
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }
                      `}
                    >

                      <p className="font-bold text-lg">
                        {userFound.is_active
                          ? 'Account Active'
                          : 'Account Disabled'}
                      </p>

                      <p className="text-sm text-muted-foreground mt-2">
                        {userFound.is_active
                          ? 'User can access the platform normally.'
                          : 'This user cannot log in.'}
                      </p>

                    </div>

                    <Button
                      onClick={
                        handleToggleBan
                      }
                      disabled={
                        togglingBan
                      }
                      className={`
                        w-full h-14 rounded-2xl
                        text-white font-bold shadow-lg
                        ${
                          userFound.is_active
                            ? 'bg-gradient-to-r from-red-500 to-pink-500'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600'
                        }
                      `}
                    >

                      <div className="flex items-center gap-2">

                        <Ban className="w-5 h-5" />

                        {togglingBan
                          ? 'Updating...'
                          : userFound.is_active
                          ? 'Deactivate Account'
                          : 'Activate Account'}

                      </div>

                    </Button>

                  </div>
                </div>

                {/* DELETE */}
                <div className="bg-white rounded-[32px] border shadow-xl overflow-hidden">

                  <div className="bg-gradient-to-r from-black to-red-700 p-7 text-white">

                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

                        <Trash2 className="w-7 h-7" />

                      </div>

                      <div>

                        <h3 className="text-2xl font-black">
                          Delete Account
                        </h3>

                        <p className="text-white/80 mt-1">
                          Permanently remove this user
                        </p>

                      </div>

                    </div>
                  </div>

                  <div className="p-7 space-y-6">

                    <div className="rounded-2xl p-5 border bg-red-50 border-red-200">

                      <p className="font-bold text-lg text-red-700">
                        Dangerous Action
                      </p>

                      <p className="text-sm text-red-600 mt-2">
                        This action permanently deletes the account
                        and cannot be undone.
                      </p>

                    </div>

                    <Button
                      onClick={
                        handleDeleteUser
                      }
                      disabled={
                        deletingUser
                      }
                      className="
                        w-full h-14 rounded-2xl
                        bg-gradient-to-r from-black to-red-700
                        hover:opacity-90
                        text-white font-bold shadow-lg
                      "
                    >

                      <div className="flex items-center gap-2">

                        <Trash2 className="w-5 h-5" />

                        {deletingUser
                          ? 'Deleting...'
                          : 'Delete Account'}

                      </div>

                    </Button>

                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}