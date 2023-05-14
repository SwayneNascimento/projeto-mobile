import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const app: Application = express();
app.use(bodyParser.json())

app.get('/', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.post('/create', async (req: Request, res: Response) => {
  const user = req.body;
  console.log(user)

  try {
    await prisma.user.create({
      data: {
        age: user.age,
        name: user.name,
        email: user.email,
        cpf:  user.cpf
      }
    });
  } catch (error) {
    console.error(error);
  }

  res.status(201).send(user);
});

app.put('/edit/:id', async (req: Request, res: Response) => {
  const user = req.body;
  const userId = Number(req.params.id);

  await prisma.user.update({
    data: {
      age: user.age,
      name: user.name,
      email: user.email,
      cpf:  user.cpf
    },
    where: {
      id: userId
    }
  });

  res.status(201).send(user);
});

app.delete('/delete/:id', async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  
  if (user) {
    await prisma.user.delete({
      where: {
        id: userId
      }
    });

    res.status(202).send('Done');
  } else {
    res.status(404).send('User not exists');
  }

});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
