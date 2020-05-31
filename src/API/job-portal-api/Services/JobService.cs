using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IJobService
    {
        IEnumerable<Job> GetAll();
        User GetById(int id);
        Job Create(Job job);
        void Delete(int id);
    }

    public class JobService : IJobService
    {
        private DataContext _context;

        public JobService(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<Job> GetAll()
        {
            return _context.Jobs;
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public Job Create(Job job)
        {
            // validation
            if (string.IsNullOrWhiteSpace(job.JobName))
                throw new AppException("Job Name is required");

            if (string.IsNullOrWhiteSpace(job.Summary))
                throw new AppException("Summary is required");

            if (string.IsNullOrWhiteSpace(job.YearsOfExp))
                throw new AppException("Years of experience is required");

            _context.Jobs.Add(job);
            _context.SaveChanges();

            return job;
        }

        public void Delete(int id)
        {
            var job = _context.Jobs.Find(id);
            if (job != null)
            {
                var appliedJobs = _context.AppliedJobs.Where(x => x.JobId == job.Id);
                foreach(AppliedJob appliedJob in appliedJobs)
                {
                    _context.AppliedJobs.Remove(appliedJob);
                }

                _context.Jobs.Remove(job);
                _context.SaveChanges();
            }
        }
    }
}