function skillsMember() {
  return {
    skills: ["JavaScript", "React", "Node"],
    showSkills: function () {
      this.skills.forEach((skill) => {
        console.log(`${this.name} knows ${skill}`);
      });
    },
  };
}