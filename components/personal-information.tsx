"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { IconUser } from "@tabler/icons-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
})

type FormValues = z.infer<typeof schema>

export const PersonalInformation = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = (values: FormValues) => {
    console.log(values)
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUser className="size-4 text-blue-500" />
          <h1 className="bg-gradient-to-r from-[#3F51B5] via-[#3A79C3] to-[#329A9A] bg-clip-text text-base font-bold text-transparent">
            Personal Information
          </h1>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Update your personal information and email address.
        </p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col">
          <CardContent className="flex flex-1 flex-col gap-6">
            {/* Full Name */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Full Name</p>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Michael" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold">Contact Information</p>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+63 912 345 6789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => form.reset()}
              disabled={!form.formState.isDirty}
              className={!form.formState.isDirty ? "pointer-events-none opacity-0" : ""}
            >
              Cancel Changes
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isDirty}
              className={!form.formState.isDirty ? "pointer-events-none opacity-0" : ""}
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
