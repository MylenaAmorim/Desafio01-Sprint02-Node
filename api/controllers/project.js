const database = require('../models');

class Project {
    static async inserir(req, res) {
        const {
            body: { title, description, tasks },
        } = req;

        let transaction;

        try {
            transaction = await database.Projects.sequelize.transaction();

            const project = await database.Projects.create(
                { title, description },
                { transaction },
            );

            await database.Tasks.bulkCreate(
                tasks.map(task => ({ ...task, project_id: project.id })),
                { transaction },
            );

            await transaction.commit();

            const data = await database.Projects.findOne({
                where: { id: project.id },
                include: [{ model: database.Tasks }],
            });

            return res.status(201).json({ message: 'Sucesso', data });
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }

            return res.status(404).json({ message: e.message });
        }
    }

    static async editar(req, res) {
        const project = await database.Projects.findByPk(req.params.id);

        if (project == null) {
            return res.status(404).json({ message: "Projeto não encontrado!" });
        }

        const {
            body: { title, description, tasks },
        } = req;

        try {
            const result = await project.update(
                { title, description, updatedAt: new Date() },
                { where: { id: req.params.id } },
            );

            const tasksExistentes = await database.Tasks.findAll({
                where: {
                    project_id: req.params.id
                }
            });

            // const qtdTasksExistentes = Object.keys(tasksExistentes).length;

            let i = 0;
            const tasksUpdate = await tasks.forEach(function (task) {
                database.Tasks.update({title: task.title, taskRelevance: task.taskRelevance, completed: task.completed, updatedAt: new Date()}, {where: {id: tasksExistentes[i].id}})
                i++;
            });
            
            const data = await database.Projects.findOne({
                where: { id: project.id },
                include: [{ model: database.Tasks }],
            });

            return res.status(200).json({ message: 'Sucesso', data });
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }

            return res.status(404).json({ message: e.message });
        }
    }

    static async deletar(req, res) {
        try { 
            const project = await database.Projects.findByPk(req.params.id);

            if (project == null) {
                return res.status(404).json({ message: "Projeto não encontrado!" });
            }

            const tasks = await database.Tasks.destroy({ where: { project_id: project.id }});

            const result = await project.destroy({ where: { id: project.id } });

            return res.status(204).json({message: "Projeto e tasks do projeto deletado com sucesso!"});
        } catch (error) {
            return res.status(404).json({message: error.message});
        }
    }

    static async visualizar(req, res) {
        try { 
            const data = await database.Projects.findOne({
                where: { id: req.params.id },
                include: [{ model: database.Tasks }],
            });

            if (data == null) {
                return res.status(404).json({ message: "Projeto não encontrado!" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({message: error.message});
        }
    }

    static async listar(req, res) {
        try { 
            const data = await database.Projects.findAll({include: { model: database.Tasks }});

            if (data == null) {
                return res.status(200).json({ message: "Nenhum projeto encontrado!" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({message: error.message});
        }
    }
}

module.exports = Project;