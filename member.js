function skillsMembers() {
    var members = new Array();
    var skills = new Array();
    for (var i = 0; i < 10; i++) {
        members.push({
            id: i,
            name: "name" + i
        });
    }
    for (var i = 0; i < 10; i++) {
        skills.push({
            id: i,
            name: "skill" + i
        });
    }
    return {
        members: members,
        skills: skills
    };
}