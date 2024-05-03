import { Router } from "express";
import userRouter from "./usersRoutes";
import { vehicleRouter } from "./vehiclesRoutes";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/vehicles",vehicleRouter );
export default router;
