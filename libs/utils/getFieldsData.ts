
export default function getFieldsData(data: object, fields: string[]) {
  const dataKeys = Object.keys(data);
  const fieldsData = {};
  fields.forEach((field) => {
    if (dataKeys.includes(field)) {
      fieldsData[field] = data[field];
    }
  });
  return fieldsData;
}
