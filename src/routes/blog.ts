import { Router } from 'express';
import {
    createBlog,
    getBlog,
    getBlogs,
    deleteBlog,
    toggleBlogStatus,
    updateBlog,
} from '../controllers/blog';
import validateToken from '../middlewares/validateToken';

const router = Router();

router.post('/', createBlog);
router.get('/', getBlogs);
router.get('/details/:id', getBlog);
router.patch('/:id', updateBlog);
router.patch('/status/:id', toggleBlogStatus);
router.delete('/:id', deleteBlog);

export default router;
