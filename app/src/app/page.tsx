import { Table } from "@/components/table";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table
        columns={[
          { accessor: "desert", value: "Dessert (100g serving)" },
          { accessor: "calories", value: "Calories" },
          { accessor: "fat", value: "Fat" },
          { accessor: "carbs", value: "Carbs" },
          { accessor: "protein", value: "Protein" },
        ]}
        rows={[
          {
            desert: "Frozen yoghurt",
            calories: 45.0,
            fat: 56.0,
            carbs: 90.09,
            protein: 56.09,
          },
          {
            desert: "Frozen yoghurt4",
            calories: 45.0,
            fat: 56.0,
            carbs: 90.09,
            protein: 56.09,
          },
        ]}
      />
    </main>
  );
}
