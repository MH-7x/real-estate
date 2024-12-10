import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import convertToPkrCurrency from "@/lib/ConvertToPkrCurrency";
import { SinResProperty } from "@/types/property";

export default function DetailPropertyTable({
  property,
}: {
  property: SinResProperty;
}) {
  const data = [
    { label: "Purpose", value: property.purpose },
    { label: "Price", value: convertToPkrCurrency(property.price) },
    { label: "Name", value: property.PropertyName },
    {
      label: "Location",
      value: `${property.street} ${property.address.area}, ${property.address.city} `,
    },
    { label: "Size", value: `${property.size.value} ${property.size.unit}` },
    { label: "Bedrooms", value: property.bedrooms },
    { label: "Bathrooms", value: property.bathrooms },
    { label: "Condition", value: property.condition },
  ];

  return (
    <Table className="mt-6">
      <TableBody>
        {data.map((item, index) => (
          <TableRow className="text-lg" key={index}>
            <TableCell className="font-medium border-r">{item.label}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
