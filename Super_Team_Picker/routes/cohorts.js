const express = require('express');
const knex = require('../db/client');
const router = express.Router();


router.get('/', (req, res) => {
    knex("cohorts")
    .select("*")
    .orderBy("id", "asc")
    .then((data) => {
        res.render("cohorts/index", {
            pageTitle: "Team List",
            cohorts: data,
        });
    });
});

router.get('/new', (req, res) => {
    res.render("cohorts/edit", {
        pageTitle: "New Team Picker",
        cohort: null
    });
});

router.post('/', (req, res) => {
    const cohortParmas = {
        members: req.body.members,
        name: req.body.name,
        logoUrl: req.body.logoUrl
    };
    knex("cohorts").insert(cohortParmas).returning("id").then(data => {
        res.redirect(`/cohorts/${data[0]}`);
    })
});
 

router.get('/:id', (req, res) => {
    knex("cohorts")
        .select("*")
        .where({
            id: req.params.id
        })
        .then(data => {
            if(data===undefined){
                res.render('cohorts/show',{cohort:false})
            }else{
                let memberList = null;
                let isTeamCount = null;
                let isMemberCount = null;
                let inputNumb = null;
                if (req.query.method && req.query.quantity) {
                    memberList = [];
                    let members = data[0].members.split(',');
                    let teamCout, memberCout, left;
                    inputNumb = parseInt(req.query.quantity);
                    if (req.query.method == 'perTeam') {
                        isMemberCount = 'checked';
                        memberCout = inputNumb;
                        teamCout = Math.floor(members.length / memberCout);
                        left = members.length % memberCout;
                    } else {
                        isTeamCount = 'checked';
                        teamCout = inputNumb;
                        memberCout = Math.floor(members.length / teamCout);
                        left = members.length % teamCout;
                    }
                    for (let i = 0; i < teamCout; i++) {
                        let temp = [];
                        for (let j = 0; j < memberCout; j++) {
                            let random = parseInt(Math.random() * (members.length));
                            temp.push(members.splice(random, 1).toString());
                        }
                        memberList.push(temp);
                    }
                    if (left != 0) {
                        if (req.query.method == 'perTeam') {
                            let temp = [];
                            for (let i = 0; i < left; i++) {
                                temp.push(members[i]);
                            }
                            memberList.push(temp);
                        } else {
                            for (let i = 0; i < left; i++) {
                                memberList[i].push(members[i]);
                            }
                        }
                    }
                }
                res.render("cohorts/show", {
                    pageTitle: "Team " + data[0].name,
                    cohort: data[0],
                    memberList: memberList,
                    isTeamCount: isTeamCount,
                    isMemberCount: isMemberCount,
                    quantity: inputNumb
                });
            }
        });
});

router.get('/:id/edit', (req, res) => {
    knex("cohorts")
        .select("*")
        .where({
            id: req.params.id
        })
        .then((data) => {
            res.render('cohorts/edit', {
                pageTitle: "Super Team Picker",
                cohort: data[0]
            });
        });
});

router.patch('/:id', (req, res) => {
    const cohortParmas = {
        members: req.body.members,
        name: req.body.name,
        logoUrl: req.body.logoUrl
    };
    knex("cohorts")
        .where({
            id: req.params.id
        })
        .update(cohortParmas).returning("*")
        .then(data => {
            res.render("cohorts/show", {
                pageTitle: "Team Picker",
                cohort: data[0],
                memberList: null,
                isTeamCount: null,
                isMemberCount: null,
                quantity: null
            });
        });
});

router.delete('/:id', (req, res) => {
    knex("cohorts")
        .where({
            id: req.params.id
        })
        .delete()
        .then((data) => {
            res.redirect("/cohorts");
        });
});


module.exports = router;