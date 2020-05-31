namespace WebApi.Entities
{
    public class Job
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public string YearsOfExp { get; set; }
        public string Summary { get; set; }
        public int PostedBy { get; set; }
        public string Company { get; set; }
    }
}