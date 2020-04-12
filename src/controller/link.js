import Link from '../models/link';

const list = async (req, res) => {
  try {
    const links = await Link.find();
    return res.status(200).json({ data: links });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const detail = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    return res.status(200).json({ data: link });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const create = async (req, res) => {
  try {
    const { url, short } = req.body;

    if (!url || !short) {
      return res.status(400).json({ data: '"url" and "short" are required' });
    }

    // TODO: Fix regex
    // if (!short.match(/(a-z-).*/)) {
    //   return res.status(400).json({ data: '"short" string must match regex (a-z-).*' });
    // }

    const existingLink = await Link.findOne({ short });

    if (existingLink) {
      return res.status(400).json({ data: '"short" link is already in use' });
    }

    const link = await Link.create({
      url,
      short,
    });
    return res.status(201).json({ data: link });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const remove = async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    return res.status(204).json();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const redirect = async (req, res) => {
  try {
    const { short } = req.params;

    const link = await Link.findOne({ short });

    link.clicks += 1;

    await link.save();

    return res.redirect(link.url);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  list,
  detail,
  create,
  remove,
  redirect,
};
