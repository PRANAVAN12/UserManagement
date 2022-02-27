const resource = require('../../../../config/tramsformer');
class userTransformer extends resource {
  toArray() {
    return {
      id: Number(this.id),
      name: this.name,
      email: this.email,
      date_of_birth: this.date_of_birth,
      mobile: this.mobile,
      address: this.address,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

module.exports = userTransformer;
