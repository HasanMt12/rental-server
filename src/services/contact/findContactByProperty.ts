import Contact from '../../models/Contact';

const findContactByProperty = async (property: string, value: string) => {
  try {
    const contact = await Contact.findOne({
      [property]: value,
    });
    return contact;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(String(error));
    }
  }
};

export default findContactByProperty;
