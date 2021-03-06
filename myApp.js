require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })


let personSchema = new mongoose.Schema({
  name : {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);




const createAndSavePerson = (done) => {
  let dave = new Person({name:'Dave', age:27,favoriteFoods:['Pizza','sweetcorn']});
  dave.save((err,data)=>{
    if(err) return console.error(err);
    done(null, data);
  })
  
};
var arrayOfPeople =[
  {
    name:'Josh',
    age: 30,
    favoriteFoods:['Peanut butter','coffee','gin']
  },
  {
    name:'Mark',
    age: 54,
    favoriteFoods:['soup','chips','noodles']
  }
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,people) =>{
    if (err) return console.log(err);
    done(null,people);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err,personFound)=>{
    if (err) return console.log(err);
    done(null, personFound)
  } );
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err,foodFound)=>{
    if (err) return console.log(err);
    done(null, foodFound)
  } );
};

const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if (err) return console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,data)=> {
    if(err) return console.log(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err,updatedPerson)=>{
      if(err) return console.log(err);
      done(null,updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, {age:ageToSet}, {new: true}, (err,updatedDoc) =>{
    if (err) return console.log(err);
    done(null,updatedDoc);
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId}, (err,data)=>{
    if (err) return console.log(err);
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,response)=>{
    if (err) return console.log(err);
    done (null,response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort('name').limit(2).select('-age').exec((err,res)=>{
    if (err) console.log(err);
    done(null,res);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
