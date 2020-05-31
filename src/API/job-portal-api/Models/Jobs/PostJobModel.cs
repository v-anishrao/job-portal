using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models.Jobs
{
    public class PostJobModel
    {
        public string JobName { get; set; }
        public string YearsOfExp { get; set; }
        public string Summary { get; set; }
        public int PostedBy { get; set; }
        public string Company { get; set; }
    }
}
