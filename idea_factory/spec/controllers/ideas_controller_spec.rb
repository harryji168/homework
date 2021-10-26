require 'rails_helper'

RSpec.describe IdeasController, type: :controller do
    def current_user
        @current_user ||= FactoryBot.create(:user)
      end
      describe '#new' do
        context 'with signed in user' do
          before do
            session[:user_id] = current_user.id
          end
          it "renders a new template" do
            get(:new)
            expect(response).to(render_template(:new))
          end
    
          it "sets an instance variable with a new idea" do
            get(:new)
            expect(assigns(:idea)).to(be_a_new(Idea))
          end
        end
        context 'without signed in user' do
          it 'redirects the user to session new' do
            get(:new)
            expect(response).to redirect_to(new_session_path)
          end
          it 'sets a danger flash message' do
            get(:new)
            expect(flash[:notice]).to be
          end
        end
      end
  
      describe "#create" do
        def valid_request
          post(:create, params: {idea: FactoryBot.attributes_for(:idea)})
        end
        context 'without signed in user' do
          it 'redirects to the new session page' do
            valid_request
            expect(response).to redirect_to(new_session_path)
          end
        end
        context 'with signed in user' do
          before do
            session[:user_id] = current_user.id
          end
          context "with valid parameters" do
            it 'saves a new news article to the db' do
              count_before = Idea.count
              valid_request
              count_after = Idea.count
              expect(count_after).to eq(count_before + 1)
            end
            it 'redirects to the show page of that news article' do
              valid_request
              idea = Idea.last
              expect(response).to(redirect_to(idea_path(idea.id)))
            end
          end
          context "with invalid parameters" do
            def invalid_request
              post(:create, params: {idea: FactoryBot.attributes_for(:idea, title: nil)})
            end
            it 'does not create a news article in the db' do
              count_before = Idea.count
              invalid_request
              count_after = Idea.count
              expect(count_after).to eq(count_before)
            end
            it 'renders the new template' do
              invalid_request
              expect(response).to render_template(:new)
            end
      
            it 'assigns an invalid news article as an instance variable' do
              invalid_request
              expect(assigns(:idea)).to be_a(Idea)
            end
          end
        end
      end
      describe '#show' do 
      it 'render show template' do
          # Given
          idea=FactoryBot.create(:idea)
          # When
          get(:show, params:{id: idea.id})
          # Then
          expect(response).to render_template(:show)
      end
      it 'set an instance variable @idea for the shown object' do
          # Given
          idea=FactoryBot.create(:idea)
          # When
          get(:show, params:{id: idea.id})
          # Then
          expect(assigns(:idea)).to(eq(idea))
          
      end
  end 
  describe '#index' do  
      it 'render the index template' do
          #given
          #when
          get(:index)
          #then
          expect(response).to render_template(:index)
      end
      it 'assign an instance variable @idea which contains all created ideas ' do
          # Given
          idea_1=FactoryBot.create(:idea)
          idea_2=FactoryBot.create(:idea)
          idea_3=FactoryBot.create(:idea)
          # When
          get(:index)
          # Then
          expect(assigns(:ideas)).to eq([idea_3, idea_2, idea_1])
      end
  end 
  describe "# edit" do 
      context "with signed in user" do
          context " as owner" do
              before do
                  # session[:user_id]=FactoryBot.create(:user)
                  current_user=FactoryBot.create(:user)
                  session[:user_id]= current_user.id
                  @idea=FactoryBot.create(:idea, user: current_user)
              end
              it "render the edit template" do
                  # Given
                  
                  #When
                  get(:edit, params:{id: @idea.id})
                  # then
                  expect(response).to render_template :edit
              end
          end
         
      end
  end 
  describe '#update' do 
      before do
          #given
          @idea= FactoryBot.create(:idea)
      end
      context "with signed in user"do
          before do
              session[:user_id]=FactoryBot.create(:user)
          end
          context "with valid parameters" do
              it "update the idea record with new attributes" do

                 
              end
              it 'redirect to the show page' do
                 
              end
          end
          context 'with invalid parameters' do 
              it 'should not update the idea record' do
                  patch(:update, params:{id: @idea.id, idea: {title: nil}})
                  idea_after_update = Idea.find(@idea.id)
                  expect(idea_after_update.title).to(eq(@idea.title))
              end
          end
      end 
  end
  describe '#destroy' do
      context "with signed in user" do
          context 'as owner' do
              before do

                  current_user=FactoryBot.create(:user)
                  session[:user_id]=current_user.id
                  @idea=FactoryBot.create(:idea, user: current_user)
                  #when
                  delete(:destroy, params:{id: @idea.id})
              end
              it 'remove idea from the db' do
                  #then 
                  expect(Idea.find_by(id: @idea.id)).to(be(nil))
              end
              it 'redirect to the idea index' do
                  expect(response).to redirect_to(ideas_path)
              end
              it 'set a flash message' do
                  expect(flash[:alert]).to be
              end 
          end
          context "as non owner" do
              before do
                  current_user = FactoryBot.create(:user)
                  session[:user_id]=current_user.id
                  @idea=FactoryBot.create(:idea)
              end
              it 'does not remove the idea' do
                  delete(:destroy,params:{id: @idea.id})
                  expect(Idea.find(@idea.id)).to eq(@idea)
              end
          end
      end
  end
end 