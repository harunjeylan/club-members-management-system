export default function getFieldsData(
  data: { [index: string]: any },
  fields: string[]
) {
  const dataKeys = Object.keys(data);

  const fieldsData: { [index: string]: any } = {};
  fields.forEach((field) => {
    if (dataKeys.includes(field)) {
      if (typeof data[field] === 'boolean') {
        fieldsData[field] = data[field];
      }
      if (!!data[field]) {
        fieldsData[field] = data[field];
      }
    }
  });
  return fieldsData;
}
