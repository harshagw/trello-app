const Board = require("../models/Board");
const List = require("../models/List");
const Card = require("../models/Card");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.getCard = async (cardId) => {
  const card = await Card.findById(cardId);

  return card;
};

module.exports.getAllCard = async (listId) => {
  const cards = await Card.find({ listId: listId });

  return cards;
};

module.exports.addCard = async (listId, title) => {
  const cards = await Card.find({ listId: listId });
  let new_order = 1;

  new_order += cards.length;

  const card = await Card.create({
    listId: listId,
    title: title,
    order: new_order,
  });

  return card;
};

module.exports.updateCard = async (listId, cardId, data) => {
  const updates = Object.keys(data);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return "not a valid operations";
  }

  try {
    console.log(listId, cardId);

    const card = await Card.findOne({
      listId: listId,
      _id: cardId,
    });

    if (!card) {
      return "cannot find the card";
    }

    updates.forEach((update) => {
      card[update] = data[update];
    });

    await card.save();

    return card;
  } catch (err) {
    console.log(err);
    return "not a valid response";
  }
};

module.exports.deleteCard = async (cardId) => {
  const card = await Card.findByIdAndDelete(cardId);

  const cards = await Card.find({ listId: card.listId });
  let new_order = 1;

  new_order += cards.length;

  for (let i = card.order + 1; i <= new_order; i++) {
    console.log("runnning find one and update");
    await Card.findOneAndUpdate(
      { listId: card.listId, order: i },
      {
        order: i - 1,
      }
    );
  }

  return card;
};

module.exports.reorderCard = async (data) => {
  console.log("running reorder function");

  if (data.destinationListId == data.sourceListId) {
    if (data.oldOrder < data.newOrder) {
      for (let i = data.oldOrder; i <= data.newOrder; i++) {
        console.log("runnning find one and update");
        await Card.findOneAndUpdate(
          { listId: data.destinationListId, order: i },
          {
            order: i - 1,
          }
        );
      }
    } else {
      for (let i = data.oldOrder; i >= data.newOrder; i--) {
        console.log("runnning find one and update 2");
        console.log("changing ", i, " to", i + 1);
        let cd = await Card.findOneAndUpdate(
          { listId: data.destinationListId, order: i },
          {
            order: i + 1,
          }
        );
      }
    }

    await Card.findOneAndUpdate(
      { listId: data.destinationListId, _id: data.cardId },
      {
        order: data.newOrder,
      }
    );
  } else {
    const sourcecards = await Card.find({ listId: data.sourceListId });
    let source_order = 1;

    source_order += sourcecards.length;

    for (let i = data.oldOrder + 1; i <= source_order; i++) {
      console.log("runnning find one and update");
      await Card.findOneAndUpdate(
        { listId: data.sourceListId, order: i },
        {
          order: i - 1,
        }
      );
    }

    const destcards = await Card.find({ listId: data.sourceListId });
    let dest_order = 1;

    dest_order += destcards.length;

    for (let i = dest_order; i >= data.newOrder; i--) {
      console.log("runnning find one and update 2");
      await Card.findOneAndUpdate(
        { listId: data.destinationListId, order: i },
        {
          order: i + 1,
        }
      );
    }

    await Card.findOneAndUpdate(
      { listId: data.sourceListId, _id: data.cardId },
      {
        listId: data.destinationListId,
        order: data.newOrder,
      }
    );
  }

  return;
};
