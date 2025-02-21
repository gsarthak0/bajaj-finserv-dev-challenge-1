"use client"

import { MultiSelect } from "@/components/multi-select";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpAzIcon, BookAIcon, HashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {z} from "zod"


const items = [
  { value: "num", label: "Numbers", icon: HashIcon },
  { value: "alp", label: "Alphabets", icon: BookAIcon },
  { value: "h_alp", label: "Highest Alphabet", icon: ArrowUpAzIcon },
];



const formSchema = z.object({
  inputData: z
    .string()
    
});

export default function Home() {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [status, setstatus] =  useState(false);


  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        inputData: "",
      },
    });
  
    const onSubmit = async (values: { inputData: string }) => {
      setLoading(true);
      setError("");
  
      try {
        // Convert input string into an array of valid characters
        const dataArray = values.inputData.split("").map((char) =>
          isNaN(Number(char)) ? char : Number(char)
        );
  
        const response = await fetch("/bfhl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: values.inputData
        });
  
        const result = await response.json();
        setResponseData(result);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.log(err);
        // toast.error(err.)
      }
      setLoading(false);
    };


  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Bajaj Finserv Health</CardTitle>
          <CardDescription>{"Chandigarh Unicersity : Dev Challenge (Qualifier 1)"}</CardDescription>
        </CardHeader>
        <div className="p-6 space-y-3">
        <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* Input Field */}
          <FormField
            control={form.control}
            name="inputData"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Enter Data</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter letters and numbers"
                    {...field}
                    className={fieldState.error ? "border-red-500" : ""}
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </Button>
        </form>
      </Form>
        </div>
        <CardFooter>
        <MultiSelect
        options={items}
        onValueChange={setSelectedFrameworks}
        defaultValue={selectedFrameworks}
        placeholder="Select fields to show"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      {
          JSON.stringify(responseData)
      }
        </CardFooter>
      </Card>
    </main>
  );
}
