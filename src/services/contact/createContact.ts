import Contact from '../../models/Contact';

export type createContactType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const createContact = async ({ name, email, phone, message }: createContactType) => {
  try {
    const contact = new Contact({
      name,
      email,
      phone,
      message,
    });
    return await contact.save();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};

export default createContact;
