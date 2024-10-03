import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentController{
    constructor(){

    }

    async listComments(req: Request, res: Response){
        try{
            const comments = await prisma.comments.findMany();

            res.json(comments)
        }catch(error){
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error,
            })
        }
        
    }

    async createComment(req: Request, res: Response){
        try{
            const commentdata = req.body;

            if(!commentdata.content && !commentdata.user && !commentdata.posts) {
                return res.status(400).json({
                    status: 400,
                    message: "Voce precisa passar o conteúdo, usuário e o post do comentário no corpo da requisição"
                });
            }
            console.log(commentdata);

            const newcomment = await prisma.comments.create({
                data: commentdata,
            });

            console.log(newcomment);

            res.json({
                status: 200,
                newcomment: newcomment,
            })
        }catch(error){
            console.log(error);
            res.json({
                status: 500,
                message: error,
            })
        }
    }
    async updateComment(req: Request, res: Response){
        try{
            const id = req.params.id;
            const body = req.body;

            const updatedcomment = await prisma.comments.update({
                where: {
                    id: parseInt(id),
                },
                data: body,
            });

            if(updatedcomment) {
                return res.json({
                    status: 200,
                    updatedcomment: updatedcomment,
                });
            }
            
        }catch(error){
            console.log(error);
            res.json({
                status: 500,
                message: error,
            });
        }
    }
    async deleteComment(req: Request, res:Response){
        try{
            const id = req.params.id;

            await prisma.comments.delete({
                where: {
                    id: parseInt(id),
                },
            });
            
            res.status(200).json({
                status: 200,
                message: 'Usuário deletado com sucesso'
            })
        }catch(error){
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error,
            })
        }
        
        
    }
}

export default new CommentController();