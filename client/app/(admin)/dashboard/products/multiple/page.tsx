"use client";
import React from "react";
import UploadProductsSheet from "@/components/UploadProductsSheet";

export default function AddMultipleProducts() {
  const [tableData, setTableData] = React.useState<string[][]>([]);

  if (tableData.length > 0) {
    return (
      <div className="h-screen grid place-content-center">
        <UploadProductsSheet
          tableData={tableData}
          setTableData={setTableData}
        />
      </div>
    );
  }

  return (
    <div className="h-screen grid place-content-center">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}
