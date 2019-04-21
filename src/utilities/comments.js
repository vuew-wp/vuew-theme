/**
 * Comment(s) Helper
 * @type {Object}
 */
import { vwQuery } from "./query";

export const commentHelper = {
  checkpoints: [],
  ancestorsLength: [],
  /**
   * Initialise checkpoints and ancestors.
   * @param a
   * @returns {Object}
   */
  addCheckpoints(a){
    this.checkpoints = a.slice(0);
    this.ancestorsLength = this.checkpoints.length;
    return commentHelper;
  },
  /**
   * Update Comment thread
   *
   * @param thread
   * @param comment
   * @returns {Object}
   */
  updateThread(thread, comment){
    /** @type {Object} */
    const newThread = thread;
    /**
     * Edge-case
     * If this is a top-level comment reply.
     */
    if(newThread.children.length === 0 && this.ancestorsLength === 1) {
      newThread.children.unshift(this.cleanComment(comment));
      return newThread.children;
    }
    /** @type array  */
    for(let i = 0, m = newThread.children.length; i < m; i++) {
      /** @type {number} commentId */
      const commentId = newThread.children[i].comment_ID;
      /** @type {number} commentIndex */
      const commentIndex = this.checkpoints.indexOf(commentId);
      /**
       * Should recurse?
       */
      if (commentIndex > -1) {
        this.checkpoints.splice(commentIndex, 1);
        if (this.checkpoints.length > 1) {
          newThread.children[i].children = this.updateThread(newThread.children[i], comment);
        }
      }
      /**
       * If there is only one checkpoint left,
       * we're in the correct comment.
       */
      if (this.checkpoints.length === 1) {
        if (this.ancestorsLength === 1) {
          newThread.children.unshift(this.cleanComment(comment));
        }else{
          newThread.children[i].children.unshift(this.cleanComment(comment));
        }
        this.checkpoints = [];
        return newThread.children;
      }
    }
    return newThread.children;
  },
  /**
   * Plucks only what we need from comments.
   * @param comment
   * @returns {{comment_author_email: *, comment_author_avatar: *, user_id: *, children: Array, comment_parent: *, comment_approved: *, comment_date: *, comment_content: *, comment_ID: *}}
   */
  cleanComment(comment){
    return {
      comment_ID: comment.id,
      comment_date: comment.date,
      comment_parent: comment.parent,
      comment_content: comment.content.raw ? comment.content.raw : comment.content.rendered,
      comment_author_email: comment.author_email,
      comment_author_avatar: comment.author_avatar_urls['96'],
      comment_author: comment.author_name,
      comment_approved: comment.status,
      user_id: comment.author,
      children: []
    }
  }
};

export default {
  commentHelper
}
