import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import contracts from "models/contracts.js";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const allContracts = await contracts.findManyAll();

  return response.status(200).json(allContracts);
}

async function postHandler(request, response) {
  const created = await contracts.create(request.body);
  return response.status(201).json(created);
}
