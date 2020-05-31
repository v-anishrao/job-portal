using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Users;
using WebApi.Models.Jobs;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class JobsController : ControllerBase
    {
        private IJobService _jobService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public JobsController(
            IJobService jobService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _jobService = jobService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost("postjob")]
        public IActionResult PostJob([FromBody]PostJobModel model)
        {
            // map model to entity
            Console.WriteLine("Received call");
            var job = _mapper.Map<Job>(model);

            try
            {
                // create user
                _jobService.Create(job);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var jobs = _jobService.GetAll();
            var model = _mapper.Map<IList<Job>>(jobs);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _jobService.GetById(id);
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _jobService.Delete(id);
            return Ok();
        }
    }
}
