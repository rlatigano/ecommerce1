using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        public StoreContext _Context { get; }
        public BuggyController(StoreContext context)
        {
           _Context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _Context.Products.Find(88);
            if (thing== null)
            {
                return NotFound(new ApiResponse(404));
            }
            return Ok();
        }
         [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var thing = _Context.Products.Find(88);
            var thingToRreturn = thing.ToString();
            return BadRequest();
        }
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {

            return NotFound(new ApiResponse(400));
        }
        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
        
    }
}