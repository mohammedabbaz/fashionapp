import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { useFilterContext } from "../utils/Providers/FilterProvider";
import { Category } from "../utils/types/Category";
import { useRouter } from "next/navigation";
export default function () {
  const {
    products,
    setselectedCategory,
    selectedCategory,
    categories,
    setSorting,
    sorting,
  } = useFilterContext();

  const router = useRouter();

  return (
    <div className="mt-4 relative">
      {/* filter mobile  */}
      <div className="block md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant={"link"}
              className="flex cursor-pointer items-center gap-2 border-b  pb-1 text-gray-900 transition"
            >
              <span className="text-sm font-medium">Filters & Sorting</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm py-9">
              <div className="space-y-4">
                {/* sorting  */}
                <div className="">
                  <Select
                    value={sorting}
                    onValueChange={(value) => setSorting(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="desc">Price, DESC</SelectItem>
                        <SelectItem value="asc">Price, ASC</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* category */}
                <div className="">
                  <Select
                    value={selectedCategory}
                    defaultValue={selectedCategory}
                    onValueChange={(value) => {
                      setselectedCategory(value);
                      
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item: Category, index: number) => (
                          <SelectItem
                            key={index}
                            asChild
                            value={item.attributes.title}
                          >
                            {item.attributes.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/*  price */}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* web filter */}
      <div className="mx-auto hidden md:block w-full max-w-sm sticky left-0 top-10">
        <div className="space-y-4">
          {/* sorting  */}
          <div className="">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Price, DESC">Price, DESC</SelectItem>
                  <SelectItem value="Price, ASC">Price, ASC</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* category */}
          <div className="">
            <Select
              value={selectedCategory}
              onValueChange={(value) => setselectedCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item: Category, index: number) => (
                    <SelectItem key={index} value={item.attributes.title}>
                      {item.attributes.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* price */}
        </div>
      </div>
    </div>
  );
}
