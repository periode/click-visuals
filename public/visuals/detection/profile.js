var Profile = function(
  _name,
  _age,
  _character,
  _gender,
  _interests,
  _orientation,
  _origin,
  _profession,
  _degree,
  _blurb,
  _imagepath){
    
  this.name = _name;
  this.gender = _gender;
  this.age = _age;
  this.character = _character;

  this.interests = _interests.copy();
  this.sexual_orientation = _sexual_orientation;

  this.origin = _origin;

  this.profession = _profession;
  this.degree = _degree;
  this.blurb = _blurb;

  this.imagepath = _imagepath; //probably a row of three images at the same time
}
