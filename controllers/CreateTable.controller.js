const Table = require("../models/CreateTable.model");
const Users = require("../models/user.model");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const CreateTable = {
  readTable: async (req, res) => {
    const table = await Table.find({
      date: {
        $gte: new Date("2022-11-29T17:47:50.010Z"),
      },
    });

    // const table = Table.find({"date" : { $gte : new Date("2022-11-29").toISOString()}})
    try {
      if (table) {
        return res.json({ tables: table });
      }

      return res.status(400).json("pas de nouvelles Tables  pour le moment");
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },

  getAllTables: async (req, res) => {
    const table = await Table.find({});
    // const user = await Users.findById(req.user.id).select("-password");
    try {
      if (table) return res.status(200).json(table);
      return res
        .status(400)
        .json( "pas de nouvelles reservations pour le moment" );
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },


  createTable: async (req, res) => {
    const utilisateur = await req.user.id;
      const user = await Users.findById(utilisateur);
      const nom =  user.name
    try {
      const { heure, title, price } = req.body;
      
      if (!heure || !title || !price) {
        return res
          .status(400)
          .json({ msg: "veuillez remplir toutes les cases s'il vous plait" });
      } else {
        console.log(nom)
        const newTable = new Table({
          heure,
          title,
          price,
          hote: utilisateur,
          createur : nom,
        });
       await newTable.save()
        res.status(201).json(newTable);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  updateTable: async (req, res) => {
    try {
      const { heure, title, price } = req.body;
      if (!heure || !title || !price) {
        return res
          .status(400)
          .json({ msg: "veuillez remplir toutes les cases s'il vous plait" });
      } else {
        const newPost = new Table({
          heure,
          title,
          price,
        });

        await newPost.save();
        res.status(201).json({ msg: "votre table a bien été crée" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
};

module.exports = CreateTable;
