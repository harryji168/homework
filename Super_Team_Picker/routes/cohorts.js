const express = require('express');
const knex = require('../db/client');
const router = express.Router();

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

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
    if(isNaN(parseInt(req.params.id))){
        res.render('cohorts/show',{cohort:false,pageTitle: "Not Found - Super Team Picker"});
    }else{     
        knex("cohorts")
            .select("*")
            .where({
                id: req.params.id
            })
            .then(data => {
                if(data===undefined){
                    res.render('cohorts/show',{cohort:false,pageTitle: "Not Found - Super Team Picker"})
                }else{
                    let memberList = null;
                    let isTeamCount = 'checked';
                    let isMemberCount = null;                
                    let members = data[0].members.split(',');
                    let inputNumb = null;                         
                    if (req.query.method && req.query.quantity) {
                        shuffle(members);
                        memberList = [];                    
                        let teamCout, memberCout;
                        inputNumb = parseInt(req.query.quantity);                    
                        if(isNaN(inputNumb)){inputNumb=1};
                        if(inputNumb<1){inputNumb=1};                    
                        if (req.query.method == 'perTeam') {
                            isTeamCount = null;
                            isMemberCount = 'checked';
                            memberCout = inputNumb;  
                            chunk= inputNumb;                                               
                        } else {
                            teamCout = inputNumb; 
                            chunk= Math.ceil(members.length/inputNumb);                                               
                        }
                        console.log(chunk);
                        var i,j;
                        for(j=0;j<chunk;j++){
                            memberList[j] =[];
                        }
                        for (i=0,j=0; i < members.length; i++) {                                                  
                            memberList[j++].push(members[i]);                                                  
                            if(j>=chunk){      
                                j=0;
                            }                                              
                        }              
                    } 
                    res.render("cohorts/show", {
                        pageTitle: "Team " + data[0].name,
                        cohort: data[0],
                        num_of_member:members.length,
                        memberList: memberList,
                        isTeamCount: isTeamCount,
                        isMemberCount: isMemberCount,
                        quantity: inputNumb
                    });
                }
            });
        
    }
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
                num_of_member:data[0].members.split(',').length,
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
// replace faker demo image with  unsplash
router.get('/demo/:id', function (req, res) { 
    if(req.params.id==0){        
        knex("cohorts")
        .min('id')     
        .then(data => {
            //console.log(data[0]);
            res.render('../db/seeds/demo',{ id: data[0]['min'] } );
        })
    }else{
          res.render('../db/seeds/demo',{ id:  req.params.id } );
    }     
});

router.patch('/input_demo_image/:id', (req, res) => {   
    //console.log(req.body);
    //console.log(req.params);
    knex("cohorts")
    .where("id", req.params.id)
    .update(      
        {  
            logoUrl: req.body.imgurl
        }    
    ).then(() => {
        knex("cohorts")
        .max('id')     
        .then(data => {
            next_id = parseInt(req.params.id)+1;
            console.log(next_id);
            if(req.params.id>data[0]['max']){ 
                res.redirect("/cohorts");
            }else{                
                res.redirect(`/cohorts/demo/${next_id}`);                
            }
        })
    })        
});

module.exports = router;