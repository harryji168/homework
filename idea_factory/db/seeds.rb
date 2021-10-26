# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Join.delete_all
Like.delete_all
Review.delete_all
Idea.delete_all
User.delete_all

NUM_IDEAS = 50
NUM_USER=10

PASSWORD='123'
super_user= User.create(
    first_name: 'Harry',
    last_name:'Ji',
    email: 'jiharry@hotmail.com',
    password: PASSWORD,
    is_admin: true
)

NUM_USER.times do
    first_name= Faker::Name.first_name 
    last_name= Faker::Name.last_name 
    User.create(
        first_name: first_name,
        last_name: last_name,
        email: "#{first_name}.#{last_name}@example.com",
        password: PASSWORD
    )
end
users=User.all

NUM_IDEAS.times do
    created_at = Faker::Date.backward(days: 365*5)
 
    p=Idea.create(
        title: Faker::Lorem.sentence(word_count: 3),
        description:Faker::Lorem.sentence(word_count: 100),
        created_at: created_at, 
        updated_at: created_at,
        user: users.sample
)
if p.valid?

    p.reviews = rand(2..10).times.map do
        Review.new(
            body: Faker::TvShows::GameOfThrones.quote,
            created_at: Faker::Date.between(from: created_at, to: Date.today),
            user: users.sample
    )
    end
    p.likers=users.shuffle.slice(0,rand(users.count))
    p.joiners=users.shuffle.slice(0,rand(users.count))

    puts p.errors.full_messages
end
end

ideas = Idea.all
reviews = Review.all

puts Cowsay.say("Generated #{ideas.count} ideas", :Cow)
puts Cowsay.say("Generated #{users.count} users.",:Ghostbusters)
puts Cowsay.say("Login with  #{super_user.email} and password:#{PASSWORD}.",:Dragon)
puts Cowsay.say("Generated #{reviews.count} reviews", :Turtle)
puts Cowsay.say("Generated #{Like.count} Likes.",:Stegosaurus)
puts Cowsay.say("Generated #{Join.count} Joins.",:Turkey)