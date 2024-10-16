const Message = require("../../../models/api/v1/Message");

const create = (req, res) => {
  const user = req.body.message.user;
  const text = req.body.message.text;

  const m = new Message({ user: user, text: text });
  m.save().then(() => {
    res.json({
      status: "success",
      data: {
        message: m,
      },
    });
  });
};

const index = async (req, res) => {
  // Find all messages
  const messages = await Message.find({});
  res.json({
    status: "success",
    data: {
      messages: messages,
    },
  });
};

const show = async (req, res) => {
  try {
    const { id } = req.params; // Haal het ID uit de URL
    const message = await Message.findById(id); // Zoek het bericht op basis van de ID
    if (!message) {
      return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
    }
    res.json({
      status: "success",
      data: {
        message: message,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const getMessagesOfUser = async (req, res) => {
  try {
    const { username } = req.params.username; // Haal de username uit de query parameters

    // Vind berichten op basis van de gebruikersnaam
    const messages = await Message.find({ user: username });

    res.json({
      status: "success",
      message: `Berichten van ${username} succesvol opgehaald`,
      data: {
        messages: messages, // Geef de gevonden berichten terug
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params; // Haal het ID uit de URL
    const { text } = req.body.message; // Haal de nieuwe text uit het request body

    // Vind en werk het bericht bij
    const message = await Message.findByIdAndUpdate(
      id,
      { text: text }, // Update alleen de 'text' van het bericht
      { new: true, runValidators: true } // Return het bijgewerkte document en valideer de nieuwe text
    );

    if (!message) {
      return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
    }

    // Stuur de response terug met het geüpdatete bericht
    res.json({
      status: "success",
      message: "Bericht succesvol bijgewerkt",
      data: {
        message: message,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
      const { id } = req.params; // Haal het ID uit de URL
      const message = await Message.findByIdAndDelete(id); // Zoek en verwijder het bericht
      if (!message) {
          return res.status(404).json({ status: "error", message: "Bericht niet gevonden" });
      }
      res.json({ status: "success", message: "Bericht succesvol verwijderd" });
  } catch (error) {
      res.status(500).json({ status: "error", message: "Interne serverfout", error: error.message });
  }
};

module.exports = {
  create,
  index,
  show,
  getMessagesOfUser,
  update,
  deleteMessage,
};