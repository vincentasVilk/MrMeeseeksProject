# Mr. Meeseeks Project

_**What this project is about?**_

 _Rick is trying to improve Mr. Meeseeks Box, but he doesn't have time to make changes as he's busy on his space adventures!_ 

_Rick decided that he needs an application so he could direct his garage chores directly to the box via an API. Then the application should use the the box to spawn Mr. Meeseeks and assigns chores to them._ 

<img width="604" alt="Screenshot 2022-06-25 at 12 48 15" src="https://user-images.githubusercontent.com/70482769/175768359-7a477cde-5e7e-4b4d-ad34-e0dd40458d25.png">

_**What this application does?**_

_This API allows an end user to create a new task, get all tasks, get task by id, update and delete a task. Additionaly, Mr. Meeseeks was created to complete those tasks. Running a CRON job, will execute newly created task, and try to solve it. In case it cannot solve it, it will spawn additional Mr. Meeseeks until the task is completed. In this project YesNoApi is used which can generate a random answer - Yes or No, to randomly select which task can be completed and which not._

_**What technologies did I use in this project?**_

- _Fastify_
- _AJV JSON schema validator_
- _Swagger_
- _MongoDB_
- _Mongoose_
- _Node Fetch_
- _DOTenv_



