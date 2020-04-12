import express from 'express';
import LinkController from '../controller/link';
import authorizer from '../helpers/authorizer';

const router = express.Router();

router.route('/api/link').get(
  authorizer,
  LinkController.list,
);

router.route('/api/link/:id([0-9a-fA-F]{24})').get(
  authorizer,
  LinkController.detail,
);

router.route('/api/link').post(
  authorizer,
  LinkController.create,
);

router.route('/api/link/:id([0-9a-fA-F]{24})').delete(
  authorizer,
  LinkController.remove,
);

// TODO: Add regex to allow letters, numbers and dashes (-)
router.route('/:short').get(
  LinkController.redirect,
);

export default router;
