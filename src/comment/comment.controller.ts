import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../user/entity/user.entity';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createComment(@Body() comment: CommentDto) {
    try {
      return await this.commentService.createComment(comment);
    } catch (error) {
      return error;
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteComment(@Param('id') id: string) {
    try {
      return await this.commentService.deleteComment(id);
    } catch (error) {
      return error;
    }
  }
}
