# README  

## Quiz II  - idea_factory
  
Build a web app to post & discuss ideas with Rails.

![Screenshot from 2021-10-25 13-34-39](https://user-images.githubusercontent.com/21187699/138766867-5008df2c-6433-4630-83b7-d675fe295c9b.png)

https://github.com/harryji168/Quiz_ideas/pull/1/commits  

###  Ruby version   

Ruby 3.0.0 &&  Rails 6.1.4.1

### System dependencies
    
 under ubuntu 20.04.3LTS
 
### Configuration
 
create folder like "idea_factory"
```shell
mkdir idea_factory && cd idea_factory 
```
download file to folder idea_factory

 
```shell
bundle install
bundle fund
bundle
```

```sh
yarn add bootstrap@next jquery @popperjs/core
```
```
bundle exec rake webpacker:install
```

##  Database creation

```
rails db:create
```
>database settings in `config\database.yml`, could change database, and run `rails db:reset`

## Database initialization

```
rails db:migrate
rails db:seed
```

![Screenshot from 2021-10-25 13-34-11](https://user-images.githubusercontent.com/21187699/138767007-4b47ab43-b931-4a4a-82e4-de7b5b44dcd1.png)


## How to run the test suite

open browser
```
http://localhost:3000/
```

## build process 

 https://github.com/harryji168/Summary_Notes/blob/master/Ruby%20on%20Rails/quiz_rails_project.md

## pull requirment

https://github.com/harryji168/Quiz_ideas/pull/1/commits

## requirement

#### Submission Guidelines

Submit your exam to Github in a new repo created exclusively for this quiz.  Once the app is set up, remember to make an initial commit and push to the repo.  Then create a new branch for your solution.  Make several commits along the way.  Once you make your final commit, push to your Github repo and make a pull request.  Submit your pull request link to your usual Homework submission form.

The deadline for the quiz is 20:00 (8:30 PM) tonight.

![Screenshot from 2021-10-25 13-43-15](https://user-images.githubusercontent.com/21187699/138767990-a3e8d847-77ce-46e6-aefe-c42dc60c345c.png)


## Part 1: CRUD

Value: 40%

##### Implement full CRUD for ideas (not fully shown in the wireframe above)
New,

![Screenshot from 2021-10-25 13-47-19](https://user-images.githubusercontent.com/21187699/138768530-9a472902-12dd-4cee-a841-2cf4141ab53a.png)

Create,

![Screenshot from 2021-10-25 13-48-59](https://user-images.githubusercontent.com/21187699/138768833-d97d9984-acec-429f-888d-878893a4c177.png)

Show, 

![Screenshot from 2021-10-25 13-50-56](https://user-images.githubusercontent.com/21187699/138768978-babece77-961a-4b94-abff-33b66222b698.png)

Index, 

![Screenshot from 2021-10-25 13-51-48](https://user-images.githubusercontent.com/21187699/138769100-caf9a2e7-b7f7-4ca6-8a9d-e88c1dda9829.png)


Delete, 

![Screenshot from 2021-10-25 13-53-01](https://user-images.githubusercontent.com/21187699/138769227-90f5a38b-2328-42de-9622-38428b063c19.png)


Edit 

![Screenshot from 2021-10-25 13-54-20](https://user-images.githubusercontent.com/21187699/138769373-769975a3-c5f5-4047-88d3-09c02f40ef89.png)       


& Update

![Screenshot from 2021-10-25 13-55-13](https://user-images.githubusercontent.com/21187699/138769499-b000b53f-05b3-47f6-b265-7a9c71305948.png)


##### Each idea has a title and a description.

Each idea has a title and a description.

![Screenshot from 2021-10-25 13-56-51](https://user-images.githubusercontent.com/21187699/138770388-3a9d6b75-20bd-43fe-82cb-7c5799f913a8.png)


![Screenshot from 2021-10-25 14-03-05](https://user-images.githubusercontent.com/21187699/138770665-fd93412d-155a-45d9-9c39-777ffcd027e8.png)


##### Make sure that there are 6 specs added (i.e. at least 6 rspec controller tests, practising TDD):
2 for the New action
4 for the Create action
run 
```
rspec -f d ./spec/controllers/ideas_controller_spec.rb 
```
 
![Screenshot from 2021-10-25 14-08-21](https://user-images.githubusercontent.com/21187699/138771207-cd4cac60-d054-4591-b25d-a1f7aa14f2bd.png)


## Part 2: User Authentication and Authorization

Value: 25%

### Implement basic user authentication:
Sign Up

![Screenshot from 2021-10-25 14-19-35](https://user-images.githubusercontent.com/21187699/138772619-cfdd8f7f-ccbd-4dc2-bd91-fe8b109a2f5a.png)


Sign In

![Screenshot from 2021-10-25 14-20-53](https://user-images.githubusercontent.com/21187699/138772760-27fbe71c-f7b9-4602-acc4-3b26e4d74d57.png)


Sign Out 

![Screenshot from 2021-10-25 14-21-32](https://user-images.githubusercontent.com/21187699/138772847-f5442df7-4e15-4d19-b0fc-e8a6f56416c5.png)


![Screenshot from 2021-10-25 14-22-11](https://user-images.githubusercontent.com/21187699/138772918-9ac3f3d7-feb8-4c63-b066-f070d71c6041.png)


### Associate created ideas with current user.

![Screenshot from 2021-10-25 14-24-20](https://user-images.githubusercontent.com/21187699/138773141-4f206e8f-dece-4933-81b9-740d90a5575e.png)


![Screenshot from 2021-10-25 14-24-57](https://user-images.githubusercontent.com/21187699/138773275-e7240c75-217e-4a29-b21b-9f97a71fae98.png)

### Allow only the creator to edit & delete their ideas.

this idea created by creator self, so can edit & delete

![Screenshot from 2021-10-25 14-27-17](https://user-images.githubusercontent.com/21187699/138773485-838ebca1-49f1-4594-bfd6-c339d5c61b67.png)

this idea created by another one, so no edit & delete button 

![Screenshot from 2021-10-25 14-26-59](https://user-images.githubusercontent.com/21187699/138774038-7ccd6a8d-9102-49b9-9d10-c970505058ba.png)

if use url directly to this edit page, it will show

![Screenshot from 2021-10-25 14-32-58](https://user-images.githubusercontent.com/21187699/138774195-c84fcc19-f103-4d4d-9913-eb4cabddda66.png)


### All rspec tests must be updated to support user authentication.

![Screenshot from 2021-10-25 14-08-21](https://user-images.githubusercontent.com/21187699/138771207-cd4cac60-d054-4591-b25d-a1f7aa14f2bd.png)


## Part 3 Reviews

Value: 20%

### Implement the ability for users to put reviews on each idea's show page

![Screenshot from 2021-10-25 14-40-59](https://user-images.githubusercontent.com/21187699/138775099-f5235cf9-0197-4cb9-993b-d26e533cda7f.png)

after submit

![Screenshot from 2021-10-25 14-42-57](https://user-images.githubusercontent.com/21187699/138775302-134d6486-8511-41b2-8ef9-77fbe0176777.png)


in another idea
![Screenshot from 2021-10-25 14-43-42](https://user-images.githubusercontent.com/21187699/138775399-e450d1aa-1d0d-4345-8fd4-bff6dbe2c1fa.png)

after submit
![Screenshot from 2021-10-25 14-44-23](https://user-images.githubusercontent.com/21187699/138775466-d1098a96-3dc5-4284-8d90-76a7346809c2.png)



### User must be signed in in order to create a review and the created reviews get associated with the signed in user


test from sign out 

![Screenshot from 2021-10-25 14-47-25](https://user-images.githubusercontent.com/21187699/138775794-f26881d1-36e7-4866-a3bb-401f935458ae.png)


after submit, if will ask login 

![Screenshot from 2021-10-25 14-48-21](https://user-images.githubusercontent.com/21187699/138775885-4710d385-7fb5-4f22-b3a8-27e84991325a.png)


### The user who created the review should be able to delete the review

after log in

![Screenshot from 2021-10-25 14-52-09](https://user-images.githubusercontent.com/21187699/138776278-ba7907ff-019d-491e-808a-d69857d0c2fb.png)

only show delete button for creator 


![Screenshot from 2021-10-25 14-52-39](https://user-images.githubusercontent.com/21187699/138776418-fd7c3901-1ebf-4f3c-84d1-bfccb8faf7e8.png)

click delete ,show message deleted

![Screenshot from 2021-10-25 14-54-26](https://user-images.githubusercontent.com/21187699/138776519-86cee3e2-c78b-4ae2-a1fb-53cdb5cfb713.png)

review list don't have this review

![Screenshot from 2021-10-25 14-55-43](https://user-images.githubusercontent.com/21187699/138776887-31bdf9c4-05fe-49d7-ba20-1f42f063794d.png)



## Part 4 Likes

Value: 10%


### Implement the ability for users to like ideas

![Screenshot from 2021-10-25 15-01-40](https://user-images.githubusercontent.com/21187699/138777279-e3412bfb-43c9-4f2d-b14a-3ef3986e1218.png)


### Display the count of likes on the Ideas index page for each idea (as shown in wireframes)

![Screenshot from 2021-10-25 15-06-36](https://user-images.githubusercontent.com/21187699/138777702-528741b5-2bdd-4db5-a80b-643b11d1dbe7.png)


### Clicking the Like button makes the idea liked by the current user.

click like button

![Screenshot from 2021-10-25 15-11-05](https://user-images.githubusercontent.com/21187699/138778233-a4a66c69-8b39-487d-8700-1aae2623e270.png)

then 

![Screenshot from 2021-10-25 15-12-38](https://user-images.githubusercontent.com/21187699/138778326-8b707a69-f74a-4e72-b4c3-a2a7ccf66866.png)


### When liked, a Liked button is displayed instead of the Like button. Clicking it unlikes the idea.

![Screenshot from 2021-10-25 15-14-20](https://user-images.githubusercontent.com/21187699/138778433-135edb0f-7a21-4907-9591-058c0ca40239.png)


## Part 5: Presentable Styling and Overall Function

Value: 5% 

Your App does not need to look exactly like the wireframes below.  They are guidelines. 
Where the wireframes and instructions differ, go in favour of the instructions.  
That being said, make sure to style your app and make it look presentable.

### extra work Join function 

click join 

![Screenshot from 2021-10-25 15-21-48](https://user-images.githubusercontent.com/21187699/138779093-d779dbea-ad6b-4b46-a2da-fccd627942fe.png)

show message joined ,click members 

![Screenshot from 2021-10-25 15-24-48](https://user-images.githubusercontent.com/21187699/138779296-b5469ad5-4165-4a5c-9e0e-c943ab986449.png)

this idea member list

![Screenshot from 2021-10-25 15-24-48](https://user-images.githubusercontent.com/21187699/138779358-c4677b18-b633-45f3-b428-2d6409498e56.png)


click joined again, then quit this idea

![Screenshot from 2021-10-25 15-26-45](https://user-images.githubusercontent.com/21187699/138779492-85f7113d-fd7d-469f-8e90-c4d6764dd9a1.png)

the member list not show include current user 

![Screenshot from 2021-10-25 15-28-12](https://user-images.githubusercontent.com/21187699/138779585-20656a7b-e6cc-42f9-8b75-893d16bdfc03.png)

### add super user to access dashboard for summary

admin dashboard
![Screenshot from 2021-10-25 15-36-44](https://user-images.githubusercontent.com/21187699/138780335-219b31fd-bb02-42a2-9fa9-544b12da2336.png)

other user:

![Screenshot from 2021-10-25 15-38-23](https://user-images.githubusercontent.com/21187699/138780450-8968e912-442d-473b-b77c-92f94369b8ec.png)

