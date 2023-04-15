class CatInstant {

    constructor(cost, cats_per_sec, curr_output, is_unlocked) {
      this.cost = cost;
      this.cats_per_sec = cats_per_sec;
      this.curr_output = curr_output;
      this.is_unlocked = is_unlocked;
    }
  
    // Getter - cost
    get cost() {
      return this.cost();
    }

    // Getter - cats per second
    get cats_per_sec() {
        return this.cats_per_sec();
    }    

    // Getter - current output
    get curr_output() {
        return this.curr_output();
    } 

    // Setter - current output
    set curr_output(value) {
        this.push(value);
    }

    // Getter - is unlocked
    get is_unlocked() {
        return this.is_unlocked();
    } 

    // Setter - is unlocked
    set is_unlocked(value) {
        this.push(value);
    }
  
  }