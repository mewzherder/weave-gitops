package add

// Provides support for adding a repository of manifests to a wego cluster. If the cluster does not have
// wego installed, the user will be prompted to install wego and then the repository will be added.

import (
	"fmt"
	"os"
	"strings"

	"github.com/go-git/go-git/v5/plumbing/transport/http"
	"github.com/lithammer/dedent"
	"github.com/spf13/cobra"
	"github.com/weaveworks/weave-gitops/pkg/cmdimpl"
	"github.com/weaveworks/weave-gitops/pkg/git"
	"github.com/weaveworks/weave-gitops/pkg/shims"
)

var params cmdimpl.AddParamSet

var Cmd = &cobra.Command{
	Use:   "add [--name <name>] [--url <url>] [--branch <branch>] [--path <path within repository>] [--private-key <keyfile>] <repository directory>",
	Short: "Add a workload repository to a wego cluster",
	Long: strings.TrimSpace(dedent.Dedent(`
        Associates an additional application in a git repository with a wego cluster so that its contents may be managed via GitOps
    `)),
	Example: "wego add .",
	Run:     runCmd,
}

func init() {
	Cmd.Flags().StringVar(&params.Owner, "owner", "", "Owner of remote git repository")
	Cmd.Flags().StringVar(&params.Name, "name", "", "Name of remote git repository")
	Cmd.Flags().StringVar(&params.Url, "url", "", "URL of remote repository")
	Cmd.Flags().StringVar(&params.Path, "path", "./", "Path of files within git repository")
	Cmd.Flags().StringVar(&params.Branch, "branch", "main", "Branch to watch within git repository")
	Cmd.Flags().StringVar(&params.DeploymentType, "deployment-type", "kustomize", "deployment type [kustomize, helm]")
	Cmd.Flags().StringVar(&params.Chart, "chart", "", "Specify chart for helm source")
	Cmd.Flags().StringVar(&params.AppConfigUrl, "app-config-url", "", "URL of external repository (if any) which will hold automation manifests; NONE to store only in the cluster")
	Cmd.Flags().BoolVar(&params.DryRun, "dry-run", false, "If set, 'wego add' will not make any changes to the system; it will just display the actions that would have been taken")
}

func runCmd(cmd *cobra.Command, args []string) {
	params.Namespace, _ = cmd.Parent().Flags().GetString("namespace")

	gitClient := git.New(&http.BasicAuth{
		Username: "weaveworks", // this can't be empty
		Password: os.Getenv("GITHUB_TOKEN"),
	})

	deps := &cmdimpl.AddDependencies{
		GitClient: gitClient,
	}
	if err := cmdimpl.Add(args, params, deps); err != nil {
		fmt.Fprintf(shims.Stderr(), "%v\n", err)
		shims.Exit(1)
	}
}
