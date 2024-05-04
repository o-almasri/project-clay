# NetWorkClass-GDP1-
(TeamWork) Network Class GDP1 Course Fanshawe 

TEAM:
- Oops
- Omar Almasri
  
BUILD INSTRUCTIONS:
- Make sure the project is Set on " Release x64 "
- Build Solution ( all projects including NetworkUtils which have post build script that copies dlls to $(OutDir))

BUILD DataBase INSTRUCTIONS:
- Go to "MySQL-dump" folder and execute Sql Command inside the 
authenticationservice.sql 

once you have SQL table Created :
- go to cBaseDAO.cpp and change the following :
- const std::string SCHEMA = "authserver"; to "your schema Name " 
- const std::string USER = "root"; to " your DB user Name " 
- const std::string PWD = "root"; to your DB Password 

EXECUTION INSTRUCTIONS:

- Ensure that the project is run using Release x64
- Ensure that you run the "Auth" project first
- Ensure that you run the "Server" project Second
- Once the Both are running, you can start as many "Client" instances that you'd like.
