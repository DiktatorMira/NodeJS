import { Router } from 'express';
import { createRole, getRoles, updateRole, deleteRole } from '../controllers/role-controller';

export const roleRouter = Router();

roleRouter.post('/', createRole);
roleRouter.get('/', getRoles);
roleRouter.put('/:id', updateRole);
roleRouter.delete('/:id', deleteRole);