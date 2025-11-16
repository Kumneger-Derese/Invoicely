import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import {
  createClient,
  deleteClient,
  getClient,
  getClients,
  updateClient
} from '../controller/clientController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import {
  createClientSchema,
  updateClientSchema
} from '../validation/clientValidation.js'

const clientRouter = Router()

clientRouter.use(protect)

clientRouter.get('/', getClients)
clientRouter.get('/:clientId', getClient)
clientRouter.post('/create', validateRequest(createClientSchema), createClient)
clientRouter.put(
  '/update/:clientId',
  validateRequest(updateClientSchema),
  updateClient
)
clientRouter.delete('/delete/:clientId', deleteClient)

export default clientRouter
